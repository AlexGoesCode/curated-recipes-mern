import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes from './routes/user.js';
import recipesRouter from './routes/recipes.js';

dotenv.config();

const addMiddlewares = (app) => {
  // adds middleware to the application
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

const startServer = (app) => {
  const port = process.env.PORT || 5022;
  app.listen(port, () => {
    console.log('Server is running on', port, 'port');
  });
};

// Load Routes
const loadRoutes = (app) => {
  app.use('/api/user', userRoutes); // Use user routes
  app.use('/api/curated-recipes', recipesRouter); // Use recipes routes
};

const DBConnection = async () => {
  // connects to the database
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('problems connecting to MongoDB'.bgRed, error);
  }
};

// IIFE (Immediately Invoked Function Expression)
(async function controller() {
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  loadRoutes(app);
  startServer(app);
})();
