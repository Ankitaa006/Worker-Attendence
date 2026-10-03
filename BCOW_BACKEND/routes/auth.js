import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, generateLoginId, generatePassword } from '../utils/helpers.js';
import Admin from '../models/Admin.js';
import Contractor from '../models/Contractor.js';
import Worker from '../models/Worker.js';

const router = express.Router();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleAuthError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'An account with one of these details already exists',
    });
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ success: false, message: error.message });
  }
  console.error('Authentication route error:', error);
  return res.status(500).json({ success: false, message: 'Unable to process authentication request' });
};

router.post('/admin/signup', async (req, res) => {
  try {
    const organizationName = String(req.body.organizationName || '').trim();
    const contactName = String(req.body.contactName || '').trim();
    const officialMail = String(req.body.officialMail || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!organizationName || !contactName || !officialMail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Organization, contact name, email, and password are required',
      });
    }
    if (!isValidEmail(officialMail)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const existingAdmin = await Admin.findOne({ officialMail });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const admin = await Admin.create({
      organizationName,
      officialMail,
      password: await bcrypt.hash(password, 12),
      name: contactName,
    });

    return res.status(201).json({
      success: true,
      message: `${organizationName} admin account registered successfully`,
      data: { id: admin._id, organizationName: admin.organizationName, email: admin.officialMail, name: admin.name, role: admin.role },
      token: generateToken(admin._id, admin.role),
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const officialMail = String(req.body.officialMail || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!officialMail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ officialMail }).select('+password');
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: { id: admin._id, email: admin.officialMail, name: admin.name, role: admin.role },
      token: generateToken(admin._id, admin.role),
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
});

router.post('/contractor/signup', async (req, res) => {
  try {
    const firmName = String(req.body.firmName || '').trim();
    const contactPerson = String(req.body.contactPerson || '').trim();
    const phoneNumber = String(req.body.phoneNumber || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const licence = String(req.body.licence || '').trim().toUpperCase();

    if (!firmName || !contactPerson || !phoneNumber || !email || !licence) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address' });
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Phone number must contain 10 digits' });
    }

    const duplicate = await Contractor.findOne({ $or: [{ email }, { licence }] });
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'Email or licence already registered' });
    }

    const loginId = generateLoginId(licence);
    const initialPassword = generatePassword();
    const contractor = await Contractor.create({
      firmName,
      contactPerson,
      phoneNumber,
      email,
      licence,
      loginId,
      password: await bcrypt.hash(initialPassword, 12),
    });

    return res.status(201).json({
      success: true,
      message: 'Contractor registered successfully. Save the one-time login credentials.',
      data: {
        id: contractor._id,
        firmName: contractor.firmName,
        role: 'contractor',
        credentials: { loginId: contractor.loginId, password: initialPassword },
      },
      token: generateToken(contractor._id, 'contractor'),
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
});

router.post('/contractor/login', async (req, res) => {
  try {
    const loginId = String(req.body.loginId || '').trim().toUpperCase();
    const password = String(req.body.password || '');
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Login ID and password are required' });
    }

    const contractor = await Contractor.findOne({ loginId }).select('+password');
    if (
      !contractor ||
      contractor.status !== 'active' ||
      !(await bcrypt.compare(password, contractor.password))
    ) {
      return res.status(401).json({ success: false, message: 'Invalid login ID or password' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contractor login successful',
      data: { id: contractor._id, firmName: contractor.firmName, role: 'contractor' },
      token: generateToken(contractor._id, 'contractor'),
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
});

router.post('/worker/login', async (req, res) => {
  try {
    const workerId = String(req.body.workerId || '').trim();
    const accessPin = String(req.body.accessPin || '');
    if (!workerId || !accessPin) {
      return res.status(400).json({ success: false, message: 'Worker ID and access PIN are required' });
    }

    const worker = await Worker.findOne({ workerId }).select('+accessPin');
    if (!worker || worker.status !== 'active' || !worker.accessPin) {
      return res.status(401).json({ success: false, message: 'Invalid worker ID or access PIN' });
    }

    const pinIsHashed = worker.accessPin.startsWith('$2');
    const isPinValid = pinIsHashed
      ? await bcrypt.compare(accessPin, worker.accessPin)
      : accessPin === worker.accessPin;
    if (!isPinValid) {
      return res.status(401).json({ success: false, message: 'Invalid worker ID or access PIN' });
    }

    if (!pinIsHashed) {
      worker.accessPin = await bcrypt.hash(accessPin, 12);
      await worker.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Worker login successful',
      data: { id: worker._id, name: worker.name, role: 'worker' },
      token: generateToken(worker._id, 'worker'),
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
});

export default router;
