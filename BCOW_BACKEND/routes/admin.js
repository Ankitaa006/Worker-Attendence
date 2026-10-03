import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticate, authorizeRole } from '../middleware/auth.js';
import { generateLoginId, generatePassword } from '../utils/helpers.js';
import Admin from '../models/Admin.js';
import Contractor from '../models/Contractor.js';
import Worker from '../models/Worker.js';
import Site from '../models/Site.js';
import Dispute from '../models/Dispute.js';
import Attendance from '../models/Attendance.js';
import Wage from '../models/Wage.js';

const router = express.Router();

// Protected route - All admin routes
router.use(authenticate);
router.use(authorizeRole('admin', 'super_admin'));

// Get Dashboard Stats
router.get('/dashboard', async (req, res) => {
  try {
    const activeSites = await Site.countDocuments({ status: 'active' });
    const totalWorkers = await Worker.countDocuments({ status: 'active' });
    const totalContractors = await Contractor.countDocuments({ status: 'active' });
    const activeDisputes = await Dispute.countDocuments({ status: 'open' });

    res.status(200).json({
      success: true,
      data: {
        activeSites,
        totalWorkers,
        totalContractors,
        activeDisputes
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Compliance Overview
router.get('/compliance-overview', async (req, res) => {
  try {
    const contractors = await Contractor.find({ status: 'active' })
      .populate('assignedSite')
      .select('firmName compliance activeWorkers phoneNumber email licence status');

    res.status(200).json({
      success: true,
      data: contractors
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Contractor Directory
router.get('/contractors', async (req, res) => {
  try {
    const contractors = await Contractor.find()
      .populate('assignedSite', 'project city')
      .select('-password');

    res.status(200).json({
      success: true,
      data: contractors
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Add New Contractor
router.post('/contractors', async (req, res) => {
  try {
    const firmName = String(req.body.firmName || '').trim();
    const contactPerson = String(req.body.contactPerson || '').trim();
    const phoneNumber = String(req.body.phoneNumber || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const licence = String(req.body.licence || '').trim().toUpperCase();

    if (!firmName || !contactPerson || !phoneNumber || !email || !licence) {
      return res.status(400).json({ success: false, message: 'All contractor fields are required' });
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Phone number must contain 10 digits' });
    }

    const duplicate = await Contractor.findOne({ $or: [{ email }, { licence }] });
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'Email or licence already registered' });
    }

    let assignedSite;
    if (req.body.assignedSite) {
      assignedSite = await Site.findById(req.body.assignedSite);
      if (!assignedSite) {
        return res.status(400).json({ success: false, message: 'Selected site was not found' });
      }
      if (assignedSite.assignedContractor) {
        return res.status(409).json({ success: false, message: 'Selected site already has an assigned contractor' });
      }
    }

    const initialPassword = generatePassword();
    const newContractor = await Contractor.create({
      firmName,
      contactPerson,
      phoneNumber,
      email,
      licence,
      assignedSite: assignedSite?._id,
      loginId: generateLoginId(licence),
      password: await bcrypt.hash(initialPassword, 12),
    });
    if (assignedSite) {
      assignedSite.assignedContractor = newContractor._id;
      await assignedSite.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Contractor added successfully',
      data: {
        id: newContractor._id,
        firmName: newContractor.firmName,
        loginId: newContractor.loginId,
        credentials: { loginId: newContractor.loginId, password: initialPassword },
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email, licence, or login ID already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error('Unable to register contractor:', error);
    return res.status(500).json({ success: false, message: 'Unable to register contractor' });
  }
});

// Suspend Contractor
router.put('/contractors/:id/suspend', async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      { status: 'suspended' },
      { new: true, runValidators: true }
    ).select('-password');

    if (!contractor) {
      return res.status(404).json({ success: false, message: 'Contractor not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Contractor suspended',
      data: contractor
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid contractor ID' });
    }
    console.error('Unable to suspend contractor:', error);
    return res.status(500).json({ success: false, message: 'Unable to suspend contractor' });
  }
});

router.put('/contractors/:id/activate', async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true, runValidators: true }
    ).select('-password');

    if (!contractor) {
      return res.status(404).json({ success: false, message: 'Contractor not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Contractor activated',
      data: contractor
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid contractor ID' });
    }
    console.error('Unable to activate contractor:', error);
    return res.status(500).json({ success: false, message: 'Unable to activate contractor' });
  }
});

// Dispute Box
router.get('/disputes', async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate('worker', 'name mobileNumber')
      .populate('contractor', 'firmName')
      .populate('site', 'project city')
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

// Mark Dispute as Resolved
router.put('/disputes/:id/resolve', async (req, res) => {
  try {
    const { resolution } = req.body;

    const dispute = await Dispute.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'resolved', 
        resolution, 
        resolvedAt: Date.now() 
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dispute marked as resolved',
      data: dispute
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Sites Directory
router.get('/sites', async (req, res) => {
  try {
    const sites = await Site.find()
      .populate('assignedContractor', 'firmName contactPerson')
      .sort({ createdAt: -1 });

    const sitesWithWorkerCounts = await Promise.all(sites.map(async (site) => ({
      ...site.toObject(),
      currentWorkers: await Worker.countDocuments({ assignedSite: site._id, status: 'active' })
    })));

    res.status(200).json({
      success: true,
      data: sitesWithWorkerCounts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Register New Site
router.post('/sites', async (req, res) => {
  try {
    const { project, city, category, totalFund, minWage, workforceCapacity, assignedContractor } = req.body;
    const parsedFund = Number(totalFund);
    const parsedMinimumWage = Number(minWage);
    const parsedCapacity = Number(workforceCapacity);
    if (
      !String(project || '').trim() ||
      !String(city || '').trim() ||
      !String(category || '').trim() ||
      !Number.isFinite(parsedFund) ||
      parsedFund < 0 ||
      !Number.isFinite(parsedMinimumWage) ||
      parsedMinimumWage <= 0 ||
      !Number.isInteger(parsedCapacity) ||
      parsedCapacity < 1
    ) {
      return res.status(400).json({ success: false, message: 'Provide valid project details, fund, minimum wage, and workforce capacity' });
    }

    if (assignedContractor) {
      const contractorExists = await Contractor.exists({ _id: assignedContractor, status: 'active' });
      if (!contractorExists) {
        return res.status(400).json({ success: false, message: 'Selected contractor was not found or is inactive' });
      }
    }

    const site = await Site.create({
      project,
      city,
      category,
      totalFund: parsedFund,
      minWage: parsedMinimumWage,
      workforceCapacity: parsedCapacity,
      assignedContractor
    });

    res.status(201).json({
      success: true,
      message: 'Site registered successfully',
      data: site
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Labour Audit
router.get('/labour-audit', async (req, res) => {
  try {
    const workers = await Worker.find()
      .populate('assignedSite', 'project minWage')
      .populate('assignedContractor', 'firmName')
      .select('name workerId dailyWage role status mobileNumber aadharNo');

    res.status(200).json({
      success: true,
      data: workers
    });

    router.get('/funds-ledger', async (req, res) => {
      try {
        const wages = await Wage.find({ status: 'paid' })
          .populate('worker', 'name workerId')
          .populate('contractor', 'firmName')
          .populate('site', 'project city')
          .select('month grossEarnings netPayable status disbursedAt')
          .sort({ disbursedAt: -1 });

        return res.status(200).json({
          success: true,
          data: wages.map((wage) => ({
            ...wage.toObject(),
            bocwCess: Number((wage.grossEarnings * 0.01).toFixed(2))
          }))
        });
      } catch (error) {
        console.error('Unable to load funds ledger:', error);
        return res.status(500).json({ success: false, message: 'Unable to load funds ledger' });
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;
