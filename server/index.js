import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// zero-dependency module, loads environment variables from a .env file into process.env
import router from './routes/testRoute.js';
import colors from 'colors'; // color and style in node.js console '.bgYellow' etc
import recipesRouter from './routes/Router.js';

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

// whatever arrives, use API version 1
const loadRoutes = (app) => {
  app.use('/api', router);
  app.use('/api/curated-recipes', recipesRouter);
};

const DBConnection = async () => {
  // connects to the database
  try {
    await mongoose.connect(process.env.MONGO_DB);
    {
      useNewUrlParser: true;
      useUnifiedTopology: true;
    }
    console.log('connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('problems connecting to MongoDB'.bgRed, error);
  }
};

//! IIFE (Immediately Invoked Function Expression) -
// to run the function immediately after defining it
//to not pollute the global scope

(async function controller() {
  // main function that runs the server
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  loadRoutes(app);
  startServer(app);
})();
