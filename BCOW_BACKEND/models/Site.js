import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  project: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  totalFund: {
    type: Number,
    required: [true, 'Total fund is required']
  },
  minWage: {
    type: Number,
    required: [true, 'Minimum wage is required']
  },
  workforceCapacity: {
    type: Number,
    required: [true, 'Workforce capacity is required']
  },
  assignedContractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
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

export default mongoose.model('Site', siteSchema);
