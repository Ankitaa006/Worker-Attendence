import mongoose from 'mongoose';

const contractorSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: [true, 'Firm name is required'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  licence: {
    type: String,
    required: [true, 'Licence is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  assignedSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  },
  compliance: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  loginId: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'inactive'],
    default: 'active'
  },
  activeWorkers: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

export default mongoose.model('Contractor', contractorSchema);
