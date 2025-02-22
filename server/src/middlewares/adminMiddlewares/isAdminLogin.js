import jwt from 'jsonwebtoken';
import { Admin } from '../../models/adminModels/admin.model.js';

async function isAdminLoggedIn(req, res, next) {
    try {
      // Extract token from cookies
      const token = req?.cookies?.adminToken;
  
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally, validate admin in the database (optional but recommended)
      const admin = await Admin.findById(decoded.adminId);
      if (!admin) {
        return res.status(403).json({ message: 'Forbidden: Admin not found.' });
      }
  
      // Attach admin details to the request object for further use
      req.admin = {
        id: decoded.adminId,
        fullName: decoded.adminFullName,
        email: decoded.adminEmail,
      };
  
      // Proceed to the next middleware or route handler
      next();
    } 
    catch (error) {
      console.error('Error verifying admin token:', error);
      return res.status(401).json({ message: error.message });
    }
  }
  


export default isAdminLoggedIn;
