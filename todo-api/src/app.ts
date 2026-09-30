import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({"status": "ok"})
})


app.use(errorHandler);


export default app;