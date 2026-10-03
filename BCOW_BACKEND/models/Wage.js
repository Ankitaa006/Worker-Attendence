import mongoose from 'mongoose';

const wageSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  month: {
    type: Date,
    required: true
  },
  daysWorked: {
    type: Number,
    default: 0
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  regularDayWage: {
    type: Number,
    default: 0
  },
  overtimeWage: {
    type: Number,
    default: 0
  },
  grossEarnings: {
    type: Number,
    default: 0
  },
  cashAdvanced: {
    type: Number,
    default: 0
  },
  previousBalance: {
    type: Number,
    default: 0
  },
  netPayable: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'paid'],
    default: 'pending'
  },
  disbursedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Wage', wageSchema);
