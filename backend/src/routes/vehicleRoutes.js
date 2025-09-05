import express from 'express';
import { getVehicleTypes, getVehicles } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/vehicle-types', getVehicleTypes);
router.get('/vehicles', getVehicles);

export default router;
