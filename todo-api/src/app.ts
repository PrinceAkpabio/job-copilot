import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { asyncHandler } from './middleware/asyncHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({"status": "ok"})
})

app.use(errorHandler);


export default app;