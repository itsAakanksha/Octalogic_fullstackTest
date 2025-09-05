import express from 'express';
import vehicleRoutes from './vehicleRoutes.js';
import bookingRoutes from './bookingRoutes.js';

const router = express.Router();

router.use('/', vehicleRoutes);
router.use('/bookings', bookingRoutes);



export default router;