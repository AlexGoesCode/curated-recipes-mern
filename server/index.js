import express from 'express';
import { c } from 'tar';
import cors from 'cors';
import router from './routes/TestRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.port || 5022;

app.listen(port, () => {
    console.log('Server is running on ', port, 'port');
});

app.use('/api', router);