import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Worker name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  dailyWage: {
    type: Number,
    required: [true, 'Daily wage is required'],
    min: 0
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true
  },
  aadharNo: {
    type: String,
    required: [true, 'Aadhar number is required'],
    unique: true
  },
  assignedSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  assignedContractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  workerId: {
    type: String,
    unique: true
  },
  accessPin: {
    type: String,
    select: false
  },
  attendance: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
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

export default mongoose.model('Worker', workerSchema);
