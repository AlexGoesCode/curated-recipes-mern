import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  //* Middleware function that checks if the user is authenticated
  const token = req.header('Authorization')?.replace('Bearer ', ''); //*
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //* Verify the token
    // find user by id using the decoded.sub (which is the user id).
    //send that user found in req.user.
    const user = await User.findById({ _id: decoded.sub }).populate(
      //* Find the user by id and populate the likedRecipes field with the Recipe model
      'likedRecipes'
    );
    // console.log('decoded :>> ', decoded);
    console.log('user in authMiddleware :>> ', user);
    req.user = user; //* Add the user to the request object
    next(); //* Call the next middleware
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
