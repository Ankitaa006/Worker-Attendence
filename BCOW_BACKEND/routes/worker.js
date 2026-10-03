import express from 'express';
import { authenticate, authorizeRole } from '../middleware/auth.js';
import Worker from '../models/Worker.js';
import Attendance from '../models/Attendance.js';
import Wage from '../models/Wage.js';
import Dispute from '../models/Dispute.js';

const router = express.Router();

// Protected routes - Worker only
router.use(authenticate);
router.use(authorizeRole('worker'));

// Get Worker Details
router.get('/profile', async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id)
      .populate('assignedSite', 'project city minWage')
      .populate('assignedContractor', 'firmName contactPerson')
      .select('-accessPin');

    res.status(200).json({
      success: true,
      data: worker
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get Attendance Records
router.get('/attendance', async (req, res) => {
  try {
    const { month } = req.query;
    const query = { worker: req.user.id };

    if (month) {
      const match = /^(\d{4})-(\d{2})$/.exec(String(month));
      if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
        return res.status(400).json({ success: false, message: 'Month must use YYYY-MM format' });
      }
      const year = Number(match[1]);
      const monthNumber = Number(match[2]);
      query.date = {
        $gte: new Date(Date.UTC(year, monthNumber - 1, 1)),
        $lt: new Date(Date.UTC(year, monthNumber, 1))
      };
    }

    const attendance = await Attendance.find(query)
      .select('date status overtimeHours dayWage')
      .sort({ date: -1 });

    const stats = {
      totalPresent: attendance.filter(a => a.status === 'present').length,
      totalAbsent: attendance.filter(a => a.status === 'absent').length,
      totalLeave: attendance.filter(a => a.status === 'leave').length,
      totalHalfDays: attendance.filter(a => a.status === 'half-day').length,
      totalOvertime: attendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0),
      totalEarned: attendance.reduce((sum, a) => sum + (a.dayWage || 0) + (a.overtimeWage || 0), 0)
    };

    res.status(200).json({
      success: true,
      data: attendance,
      stats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get Current Month Wage Slip
router.get('/wage-slip', async (req, res) => {
  try {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const monthStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
    const nextMonthStart = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));

    let wage = await Wage.findOne({
      worker: req.user.id,
      month: { $gte: monthStart, $lt: nextMonthStart }
    });

    if (!wage) {
      const attendance = await Attendance.find({
        worker: req.user.id,
        date: { $gte: monthStart, $lt: nextMonthStart }
      });

      const worker = await Worker.findById(req.user.id);
      if (!worker) {
        return res.status(404).json({ success: false, message: 'Worker account no longer exists' });
      }
      const daysWorked = attendance.reduce(
        (sum, record) => sum + (record.status === 'present' ? 1 : record.status === 'half-day' ? 0.5 : 0),
        0
      );
      const overtime = attendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0);
      const regularWage = worker.dailyWage * daysWorked;
      const overtimeWage = worker.dailyWage * 1.5 * overtime;
      const grossEarnings = regularWage + overtimeWage;

      wage = {
        month,
        daysWorked,
        overtimeHours: overtime,
        regularDayWage: regularWage,
        overtimeWage,
        grossEarnings,
        netPayable: grossEarnings
      };
    }

    res.status(200).json({
      success: true,
      data: wage
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get Payment Receipts
router.get('/payment-receipts', async (req, res) => {
  try {
    const wages = await Wage.find({ 
      worker: req.user.id,
      status: 'paid'
    })
    .select('month netPayable disbursedAt')
    .sort({ disbursedAt: -1 });

    res.status(200).json({
      success: true,
      data: wages
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Report Issue
router.post('/disputes', async (req, res) => {
  try {
    const title = String(req.body.title || '').trim();
    const description = String(req.body.description || '').trim();
    const category = String(req.body.category || '').trim();
    if (!title || !description || !['wage', 'attendance', 'working_conditions', 'accident', 'other'].includes(category)) {
      return res.status(400).json({ success: false, message: 'A title, description, and valid category are required' });
    }

    const worker = await Worker.findById(req.user.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker account no longer exists' });
    }
    const caseId = `CASE-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const dispute = new Dispute({
      caseId,
      worker: req.user.id,
      contractor: worker.assignedContractor,
      site: worker.assignedSite,
      title,
      description,
      category
    });

    await dispute.save();

    res.status(201).json({
      success: true,
      message: 'Dispute reported successfully',
      data: dispute
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get Active Issues/Disputes
router.get('/disputes', async (req, res) => {
  try {
    const disputes = await Dispute.find({ worker: req.user.id })
      .select('caseId title category status raisedAt resolvedAt')
      .sort({ raisedAt: -1 });

    res.status(200).json({
      success: true,
      data: disputes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;
