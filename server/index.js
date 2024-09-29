import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRouter from './routes/userRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import { cloudinaryConfig } from './config/cloudinary.js';

dotenv.config();

//* Add the middleware functions by calling app.use()
const addMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  cloudinaryConfig();
};

//* Start the server by calling app.listen()
const startServer = (app) => {
  const port = process.env.PORT || 5022;
  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
};

const loadRoutes = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/curated-recipes', recipesRouter);
};

//* Connect to the MongoDB database by calling mongoose.connect()
const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('Problems connecting to MongoDB'.bgRed, error);
  }
};

//* Immediatelly Invoked Function Expression
(async function controller() {
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  loadRoutes(app);
  startServer(app);
})();
