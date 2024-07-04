import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import passwordEncryption from '../utils/passwordServices.js';
import { r } from 'tar';
import { imageUpload } from '../utils/imageUpload.js';

export const registerUser = async (req, res) => {
  console.log('req.body!!! :>> ', req.body);
  console.log('req.file :>> ', req.file);

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log('user :>> ', user);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (!user) {
      const hashedPassword = await passwordEncryption(req.body.password);
      if (!hashedPassword) {
        return res
          .status(500)
          .json({ message: 'Server error hashing password' });
      }
      if (hashedPassword) {
        //upload file to cloudinary
        const avatar = await imageUpload(req.file, 'user-avatars');
        console.log('avatar :>> ', avatar);

        const newUser = new User({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          avatar: avatar,
        });
        const savedUser = await newUser.save();
        //! if you want to leave the user logged in after registration,
        //! generate the token with the user id, and include the token in the response.
        //! In the client, save the token in local storage.
        res.status(201).json({
          message: 'user registered successfully',
          user: savedUser,
        });
        return;
      }
    }
  } catch (error) {
    console.log('Registration error :>> ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('likedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }
    if (isPasswordCorrect) {
      const options = {
        expiresIn: '1h',
      };
      const payload = {
        sub: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      console.log('token :>> ', token);
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.name,
          avatar: user.avatar,
          likedRecipes: user.likedRecipes,
        },
        token,
      });
    }
  } catch (error) {
    console.log('Login error :>> ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const testAuth = async (req, res) => {
  console.log('testing auth');
  console.log('req.user :>> ', req.user);
};

export const uploadAvatar = async (req, res) => {
  console.log('req.file :>> ', req.file);
  // console.log('req.user :>> ', req.user);
  try {
    const userId = req.user._id; // Assuming `req.user.sub` contains the user ID from the auth middleware
    try {
      const avatar = await imageUpload(req.file, 'user-avatars');
      console.log('avatar :>> ', avatar);

      if (!avatar) {
        console.log('no avatar uploaded');
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
      if (avatar) {
        console.log('avatar uploaded successfully');
        const user = await User.findByIdAndUpdate(
          userId,
          { avatar: avatar },
          { new: true }
        );
        console.log('user :>> ', user);
        return res.status(200).json({
          message: 'Avatar uploaded successfully',
          avatar: user.avatar,
        });
      }
    } catch (error) {
      console.log('error upload avatar :>> ', error);
      res.status(500).json({ message: 'Failed to upload avatar' });
    }
  } catch (error) {
    console.log('Avatar upload error :>> ', error);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
};
export const getUserProfile = async (req, res) => {
  console.log('req.user controller:>> ', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  if (req.user) {
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.name,
        avatar: req.user.avatar,
        likedRecipes: req.user.likedRecipes,
      },
    });
  }
};
