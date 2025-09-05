import express from 'express';
import vehicleRoutes from './vehicleRoutes.js';

const router = express.Router();

router.use('/', vehicleRoutes);



export default router;
