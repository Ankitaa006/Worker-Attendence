import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    trim: true
  },
  officialMail: {
    type: String,
    required: [true, 'Official email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super_admin']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Admin', adminSchema);
