// server/middleware/protect.js
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

const protect = async (req, res, next) => {
  let token;

  // Token mil raha hai kya headers me?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token nikal
      token = req.headers.authorization.split(' ')[1];

      // Token verify kar
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Admin data attach kar de request me
      req.admin = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('❌ Token failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
