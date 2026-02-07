// server/middleware/verifyToken.js
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check in DB if admin still exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: 'Invalid token: Admin not found' });
    }

    req.admin = admin; // pass admin object forward
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
