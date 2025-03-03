import jwt from 'jsonwebtoken';
import User from '../../models/userModels/user.model.js';


async function isUserLoggedin(req, res, next) {
    try {
      // Extract token from cookies
      const token = req?.cookies?.token;
  
      if (!token) {
        return res.status(401).json({ message: 'Please log in first' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      
      // Find the user in the database
      const currentUser = await User.findById(decoded.id); // Assuming decoded contains a 'userId' for regular users
      
      if (!currentUser) {
        return res.status(403).json({ message: 'Forbidden: User not found.' });
      }
  
      // Optionally, you can add additional validations here if needed
  
      // Attach user details to the request object for further use
      req.user = {
        id: decoded.id, // Use 'userId' from the token
        email: decoded.email, // Ensure the token contains this info
      };
  
      // Proceed to the next middleware or route handler
      next();
    } 
    catch (error) {
      console.error('Error verifying user token:', error);
      return res.status(401).json({ message: error.message });
    }
}

export default isUserLoggedin;
