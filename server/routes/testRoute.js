import express from 'express';

const router = express.Router();

router.get('/test', (request, response) => {
  response.send({
    message: 'this is a test route',
  });
});

export default router;
