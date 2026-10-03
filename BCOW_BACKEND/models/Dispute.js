import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema({
  caseId: {
    type: String,
    unique: true,
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor'
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  },
  title: {
    type: String,
    required: [true, 'Dispute title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['wage', 'attendance', 'working_conditions', 'accident', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'under_review', 'resolved', 'closed'],
    default: 'open'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  resolution: {
    type: String,
    trim: true
  },
  raisedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Dispute', disputeSchema);
