import express from 'express';
import { checkAvailability, createBooking, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/check-availability', checkAvailability);

export default router;
