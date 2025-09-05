import prisma from '../config/prisma.js';

const getVehicleTypes = async (req, res, next) => {
  try {
    const { wheels } = req.query;
    
    const whereClause = {};
    if (wheels) {
      const wheelCount = parseInt(wheels);
      if (![2, 4].includes(wheelCount)) {
        return res.sendError('Wheels must be either 2 or 4', 400);
      }
      whereClause.wheels = wheelCount;
    }

    const vehicleTypes = await prisma.vehicleType.findMany({
      where: whereClause,
      orderBy: { name: 'asc' }
    });

    res.sendSuccess(vehicleTypes, 'Vehicle types retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getVehicles = async (req, res, next) => {
  try {
    const { vehicle_type_id } = req.query;

    if (!vehicle_type_id) {
      return res.sendError('vehicle_type_id is required', 400);
    }

    const vehicleTypeId = parseInt(vehicle_type_id);
    if (isNaN(vehicleTypeId)) {
      return res.sendError('vehicle_type_id must be a valid number', 400);
    }

    // Check if vehicle type exists
    const vehicleType = await prisma.vehicleType.findUnique({
      where: { id: vehicleTypeId }
    });
    
    if (!vehicleType) {
      return res.sendError('Vehicle type not found', 404);
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        vehicleTypeId: vehicleTypeId,
        isAvailable: true
      },
      include: {
        vehicleType: {
          select: {
            name: true,
            wheels: true
          }
        }
      },
      orderBy: { modelName: 'asc' }
    });

    res.sendSuccess(vehicles, 'Vehicles retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export {
  getVehicleTypes,
  getVehicles
};
