import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import * as dotenv from 'dotenv'; // zero-dependency module, loads environment variables from a .env file into process.env
import router from './routes/testRoute.js';
import colors from 'colors'; // color and style in node.js console

dotenv.config();

const addMiddlewares = (app) => {
  // const app = express();
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
  app.use('/api/', router);
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('problems connecting to MongoDB'.bgRed, error);
  }
};

// IIFE (Immediately Invoked Function Expression) -
// to run the function immediately after defining it
//to not pollute the global scope

(async function controller() {
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  loadRoutes(app);
  startServer(app);
})();
