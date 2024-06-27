import express, { request, response } from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const addMiddleware = (request, response, next) => {
  console.log('This is a middleware');
  next();
}

router.get('/test', middleware (request, response) => {
  response.send({
    message: 'this is a test route',
  });
});

export default router;
