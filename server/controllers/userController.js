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
        const newUser = new User({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          avatar: image,
        });
        const savedUser = await newUser.save();
        res.status(201).json({
          message: 'user registered successfully',
          savedUser,
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
    const user = await User.findOne({ email });
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
          _id: user._id,
          email: user.email,
          username: user.name,
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
