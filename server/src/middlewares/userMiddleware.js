import jwt from 'jsonwebtoken';
import User from '../../models/userModels/user.model.js';


async function isUserLoggedin(req, res, next) {
    try {
     
      const token = req?.cookies?.token;
  
      if (!token) {
        return res.status(401).json({ message: 'Please log in first' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      const currentUser = await User.findById(decoded.id); 
      
      if (!currentUser) {
        return res.status(403).json({ message: 'Forbidden: User not found.' });
      }
  
      req.user = {
        id: decoded.id, 
        email: decoded.email, 
      };
  
      next();
    } 
    catch (error) {
      console.error('Error verifying user token:', error);
      return res.status(401).json({ message: error.message });
    }
}

export default isUserLoggedin;
