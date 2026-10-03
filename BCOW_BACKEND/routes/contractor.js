import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticate, authorizeRole } from '../middleware/auth.js';
import Worker from '../models/Worker.js';
import Contractor from '../models/Contractor.js';
import Site from '../models/Site.js';
import Attendance from '../models/Attendance.js';
import Wage from '../models/Wage.js';
import Dispute from '../models/Dispute.js';
import { calculateBOCWCess } from '../utils/helpers.js';

const router = express.Router();

// Protected routes - Contractor only
router.use(authenticate);
router.use(authorizeRole('contractor'));

// Get Dashboard Stats
router.get('/dashboard', async (req, res) => {
  try {
    const workers = await Worker.countDocuments({ assignedContractor: req.user.id, status: 'active' });
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const todayAttendance = await Attendance.countDocuments({
      contractor: req.user.id,
      date: { $gte: startOfDay, $lt: startOfTomorrow }
    });

    res.status(200).json({
      success: true,
      data: {
        totalWorkers: workers,
        todayAttendance
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

router.get('/sites', async (req, res) => {
  try {
    const sites = await Site.find({ assignedContractor: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: sites });
  } catch (error) {
    console.error('Unable to load contractor sites:', error);
    return res.status(500).json({ success: false, message: 'Unable to load sites' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user.id)
      .populate('assignedSite', 'project city minWage');
    if (!contractor) {
      return res.status(404).json({ success: false, message: 'Contractor account no longer exists' });
    }
    return res.status(200).json({
      success: true,
      data: {
        id: contractor._id,
        firmName: contractor.firmName,
        contactPerson: contractor.contactPerson,
        assignedSite: contractor.assignedSite,
        role: 'contractor'
      }
    });
  } catch (error) {
    console.error('Unable to load contractor profile:', error);
    return res.status(500).json({ success: false, message: 'Unable to load contractor profile' });
  }
});

// Mark Attendance
router.post('/attendance', async (req, res) => {
  try {
    const { workerId, date, status, overtimeHours } = req.body;
    const parsedOvertime = Number(overtimeHours || 0);
    if (!['present', 'absent', 'leave', 'half-day'].includes(status) || !Number.isFinite(parsedOvertime) || parsedOvertime < 0) {
      return res.status(400).json({ success: false, message: 'Provide a valid attendance status and non-negative overtime hours' });
    }

    const worker = await Worker.findOne({
      _id: workerId,
      assignedContractor: req.user.id,
      status: 'active'
    });
    if (!worker) {
      return res.status(404).json({ 
        success: false, 
        message: 'Active worker not found for this contractor'
      });
    }
    const attendanceDate = date ? new Date(`${date}T00:00:00.000Z`) : new Date();
    if (Number.isNaN(attendanceDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid attendance date' });
    }
    attendanceDate.setUTCHours(0, 0, 0, 0);
    const nextAttendanceDate = new Date(attendanceDate);
    nextAttendanceDate.setUTCDate(nextAttendanceDate.getUTCDate() + 1);

    const attendance = await Attendance.findOneAndUpdate(
      { worker: workerId, date: { $gte: attendanceDate, $lt: nextAttendanceDate } },
      {
        worker: workerId,
        site: worker.assignedSite,
        contractor: req.user.id,
        date: attendanceDate,
        status,
        overtimeHours: parsedOvertime,
        dayWage: status === 'present' ? worker.dailyWage : status === 'half-day' ? worker.dailyWage / 2 : 0,
        overtimeWage: worker.dailyWage * 1.5 * parsedOvertime
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance
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
    const { date } = req.query;
    const query = { contractor: req.user.id };

    if (date) {
      const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(date));
      if (!dateMatch) {
        return res.status(400).json({ success: false, message: 'Date must use YYYY-MM-DD format' });
      }
      const startDate = new Date(Date.UTC(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3])));
      if (Number.isNaN(startDate.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid attendance date' });
      }
      const dayStart = startDate;
      const nextDayStart = new Date(dayStart);
      nextDayStart.setUTCDate(nextDayStart.getUTCDate() + 1);
      query.date = { $gte: dayStart, $lt: nextDayStart };
    }

    const attendance = await Attendance.find(query)
      .populate('worker', 'name role dailyWage aadharNo')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Labour Directory
router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find({ assignedContractor: req.user.id })
      .populate('assignedSite', 'project city')
      .select('-accessPin');

    res.status(200).json({
      success: true,
      data: workers
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

router.get('/wage-slips', async (req, res) => {
  try {
    const wages = await Wage.find({ contractor: req.user.id })
      .populate('worker', 'name workerId role dailyWage')
      .populate('site', 'project city')
      .sort({ month: -1 });
    return res.status(200).json({ success: true, data: wages });
  } catch (error) {
    console.error('Unable to load wage slips:', error);
    return res.status(500).json({ success: false, message: 'Unable to load wage slips' });
  }
});

// Add New Worker
router.post('/workers', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const role = String(req.body.role || '').trim();
    const dailyWage = Number(req.body.dailyWage);
    const mobileNumber = String(req.body.mobileNumber || '').trim();
    const aadharNo = String(req.body.aadharNo || '').trim();
    const assignedSite = req.body.assignedSite || undefined;

    if (!name || !role || !Number.isFinite(dailyWage) || dailyWage <= 0 || !mobileNumber || !aadharNo) {
      return res.status(400).json({ success: false, message: 'Valid worker details are required' });
    }
    if (!/^\d{10}$/.test(mobileNumber) || !/^\d{12}$/.test(aadharNo)) {
      return res.status(400).json({ success: false, message: 'Mobile number must have 10 digits and Aadhaar number must have 12 digits' });
    }
    if (!assignedSite) {
      return res.status(400).json({ success: false, message: 'Assign the worker to one of your sites' });
    }
    const site = await Site.findOne({ _id: assignedSite, assignedContractor: req.user.id });
    if (!site) {
      return res.status(400).json({ success: false, message: 'Selected site is not assigned to this contractor' });
    }

    const workerId = `WID-${req.user.id}-${Date.now()}`;
    const accessPin = mobileNumber.toString().slice(-4);

    const worker = await Worker.create({
      name,
      role,
      dailyWage,
      mobileNumber,
      aadharNo,
      assignedSite,
      assignedContractor: req.user.id,
      workerId,
      accessPin: await bcrypt.hash(accessPin, 12)
    });
    await Contractor.updateOne(
      { _id: req.user.id },
      { $inc: { activeWorkers: 1 } }
    );

    return res.status(201).json({
      success: true,
      message: 'Worker registered successfully',
      data: {
        id: worker._id,
        name: worker.name,
        role: worker.role,
        dailyWage: worker.dailyWage,
        mobileNumber: worker.mobileNumber,
        aadharNo: worker.aadharNo,
        assignedSite: worker.assignedSite,
        workerId: worker.workerId,
        credentials: { workerId: worker.workerId, accessPin },
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'This mobile number or Aadhaar is already registered' });
    }
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error('Unable to register worker:', error);
    return res.status(500).json({ success: false, message: 'Unable to register worker' });
  }
});

// Wage Calculator
router.get('/wages/:workerId', async (req, res) => {
  try {
    const [year, monthNumber] = new Date().toISOString().slice(0, 7).split('-').map(Number);

    const wage = await Wage.findOne({
      worker: req.params.workerId,
      contractor: req.user.id,
      month: {
        $gte: new Date(year, monthNumber - 1, 1),
        $lt: new Date(year, monthNumber, 1)
      }
    }).populate('worker', 'name role dailyWage');

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

// Generate Wage Slip
router.post('/wages', async (req, res) => {
  try {
    const { workerId, month } = req.body;
    const match = /^(\d{4})-(\d{2})$/.exec(String(month || ''));
    if (!match) {
      return res.status(400).json({ success: false, message: 'Month must use YYYY-MM format' });
    }
    const year = Number(match[1]);
    const monthNumber = Number(match[2]);
    if (monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ success: false, message: 'Month must be between 01 and 12' });
    }

    const worker = await Worker.findOne({ _id: workerId, assignedContractor: req.user.id });
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found for this contractor' });
    }
    const monthStart = new Date(year, monthNumber - 1, 1);
    const nextMonthStart = new Date(year, monthNumber, 1);
    const existingWage = await Wage.findOne({
      worker: workerId,
      contractor: req.user.id,
      month: monthStart
    });
    if (existingWage) {
      return res.status(409).json({ success: false, message: 'A wage slip already exists for this worker and month' });
    }
    const attendanceRecords = await Attendance.find({
      worker: workerId,
      contractor: req.user.id,
      date: { $gte: monthStart, $lt: nextMonthStart }
    });

    const daysWorked = attendanceRecords.reduce(
      (sum, record) => sum + (record.status === 'present' ? 1 : record.status === 'half-day' ? 0.5 : 0),
      0
    );
    const overtime = attendanceRecords.reduce((sum, a) => sum + (a.overtimeHours || 0), 0);
    const regularWage = worker.dailyWage * daysWorked;
    const overtimeWage = worker.dailyWage * 1.5 * overtime;
    const grossEarnings = regularWage + overtimeWage;
    const cashAdvanced = Number(req.body.cashAdvanced || 0);
    const previousBalance = Number(req.body.previousBalance || 0);
    if (!Number.isFinite(cashAdvanced) || cashAdvanced < 0 || !Number.isFinite(previousBalance) || previousBalance < 0) {
      return res.status(400).json({ success: false, message: 'Advance and balance values must be valid numbers' });
    }

    const wage = new Wage({
      worker: workerId,
      site: worker.assignedSite,
      contractor: req.user.id,
      month: monthStart,
      daysWorked,
      overtimeHours: overtime,
      regularDayWage: regularWage,
      overtimeWage,
      grossEarnings,
      cashAdvanced,
      previousBalance,
      netPayable: Math.max(0, grossEarnings - cashAdvanced - previousBalance)
    });

    await wage.save();

    res.status(201).json({
      success: true,
      message: 'Wage slip generated',
      data: wage
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Payment and Ledger
router.get('/payment-ledger', async (req, res) => {
  try {
    const wages = await Wage.find({ contractor: req.user.id })
      .populate('worker', 'name workerId')
      .populate('site', 'project city')
      .sort({ createdAt: -1 });

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

// Disburse Wage
router.put('/wages/:id/disburse', async (req, res) => {
  try {
    const wage = await Wage.findOneAndUpdate(
      { _id: req.params.id, contractor: req.user.id, status: { $ne: 'paid' } },
      { 
        status: 'paid', 
        disbursedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!wage) {
      return res.status(404).json({ success: false, message: 'Unpaid wage record not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Wage disbursed successfully',
      data: {
        ...wage.toObject(),
        bocwCess: calculateBOCWCess(wage.grossEarnings)
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid wage record ID' });
    }
    console.error('Unable to disburse wage:', error);
    return res.status(500).json({ success: false, message: 'Unable to disburse wage' });
  }
});

export default router;
