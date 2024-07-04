import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find user by id using the decoded.sub (which is the user id). done
    //send that user found in req.user. done
    const user = await User.findById({ _id: decoded.sub }).populate(
      'likedRecipes'
    );
    // console.log('decoded :>> ', decoded);
    console.log('user in authMiddleware :>> ', user);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
