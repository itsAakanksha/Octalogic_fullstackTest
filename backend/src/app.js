import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import prisma from './config/prisma.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import responseFormatter from './middlewares/responseFormatter.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(responseFormatter);


app.get('/', (req, res) => {
  res.sendSuccess('Vehicle Booking API is running!', { status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api', routes);
app.use('/', routes);

app.use(errorHandler);


app.use((req, res) => {
  res.sendError('Route not found', 404);
});


const startServer = async () => {
  try {

    await prisma.$connect();
    console.log('Database connection established successfully.');

    // app.listen(PORT, () => {
    //   console.log(`Server is running on port ${PORT}`);
    // });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
