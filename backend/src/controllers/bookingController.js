import prisma from '../config/prisma.js';

const checkAvailability = async (req, res, next) => {
  try {
    const { vehicle_id, start_date, end_date } = req.query;

    if (!vehicle_id || !start_date || !end_date) {
      return res.sendError('vehicle_id, start_date, and end_date are required', 400);
    }

    const vehicleId = parseInt(vehicle_id);
    if (isNaN(vehicleId)) {
      return res.sendError('vehicle_id must be a valid number', 400);
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      return res.sendError('Vehicle not found', 404);
    }

    const overlappingBookings = await prisma.booking.findMany({
      where: {
        vehicleId: vehicleId,
        bookingStatus: 'confirmed',
        AND: [
          { startDate: { lte: new Date(end_date) } },
          { endDate: { gte: new Date(start_date) } }
        ]
      }
    });

    const isAvailable = overlappingBookings.length === 0;

    res.sendSuccess(
      { 
        available: isAvailable,
        vehicle_id: vehicleId,
        start_date,
        end_date
      }, 
      isAvailable ? 'Vehicle is available' : 'Vehicle is not available for the selected dates'
    );
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { first_name, last_name, vehicle_id, start_date, end_date } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicle_id },
      include: {
        vehicleType: true
      }
    });

    if (!vehicle) {
      return res.sendError('Vehicle not found', 404);
    }

    const overlappingBookings = await prisma.booking.findMany({
      where: {
        vehicleId: vehicle_id,
        bookingStatus: 'confirmed',
        AND: [
          { startDate: { lte: new Date(end_date) } },
          { endDate: { gte: new Date(start_date) } }
        ]
      }
    });

    if (overlappingBookings.length > 0) {
      return res.sendError('Vehicle is not available for the selected dates', 409);
    }

    const booking = await prisma.booking.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        vehicleId: vehicle_id,
        startDate: new Date(start_date),
        endDate: new Date(end_date)
      },
      include: {
        vehicle: {
          include: {
            vehicleType: true
          }
        }
      }
    });

    res.sendSuccess(booking, 'Booking created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vehicle: {
          include: {
            vehicleType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.sendSuccess(bookings, 'Bookings retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export {
  checkAvailability,
  createBooking,
  getAllBookings
};
