import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';

export const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const generateLoginId = (licence) => {
  const prefix = String(licence).replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
  return `${prefix}-${randomBytes(4).toString('hex').toUpperCase()}`;
};

export const generatePassword = () => {
  return randomBytes(12).toString('base64url');
};

export const generateWorkerId = (contractorId, random) => {
  return `WID-${contractorId}-${random}-${Date.now()}`;
};

export const calculateCompliance = (wageScore, cessScore, payoutScore, disposalScore) => {
  return (0.35 * wageScore) + (0.25 * cessScore) + (0.25 * payoutScore) + (0.15 * disposalScore);
};

export const calculateBOCWCess = (totalGrossEarnings) => {
  return 0.01 * totalGrossEarnings;
};
