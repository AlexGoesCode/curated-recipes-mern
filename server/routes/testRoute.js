import express, { request, response } from 'express';
// import authMiddleware from '../middleware/auth';

const router = express.Router();

//* Define a middleware function
const addMiddleware = (request, response, next) => {
  console.log('This is a middleware');
  next();
};

//* Define the routes for the test API
router.get('/test', addMiddleware, (request, response) => {
  response.send({
    message: 'this is a test route',
  });
});

export default router;
