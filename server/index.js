import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRouter from './routes/userRouter.js';
import recipesRouter from './routes/recipesRouter.js';

dotenv.config();

const addMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

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

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('Problems connecting to MongoDB'.bgRed, error);
  }
};

(async function controller() {
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  loadRoutes(app);
  startServer(app);
})();
