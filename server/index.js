import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRouter from './routes/userRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import { cloudinaryConfig } from './config/cloudinary.js';
import { baseUrl, port, mongoDbUrl } from './serverConfig.js';

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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const loadRoutes = (app) => {
  app.use(`${baseUrl}/api/user`, userRouter); // added ${baseUrl}
  app.use(`${baseUrl}/api/curated-recipes`, recipesRouter); // added ${baseUrl}
};

//* Connect to the MongoDB database by calling mongoose.connect()
const DBConnection = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('Problem with connecting to MongoDB'.bgRed, error);
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
