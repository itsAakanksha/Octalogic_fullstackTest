import prisma from '../src/config/prisma.js';

async function main() {
  try {
    console.log('Starting database seeding...');


    await prisma.booking.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.vehicleType.deleteMany();

    console.log('Creating vehicle types...');
    

    const vehicleTypes = await prisma.vehicleType.createMany({
      data: [
        { name: 'Hatchback', wheels: 4 },
        { name: 'SUV', wheels: 4 },
        { name: 'Sedan', wheels: 4 },
        { name: 'Cruiser', wheels: 2 }
      ]
    });

    console.log('Creating vehicles...');

    const hatchback = await prisma.vehicleType.findFirst({ where: { name: 'Hatchback' } });
    const suv = await prisma.vehicleType.findFirst({ where: { name: 'SUV' } });
    const sedan = await prisma.vehicleType.findFirst({ where: { name: 'Sedan' } });
    const cruiser = await prisma.vehicleType.findFirst({ where: { name: 'Cruiser' } });

   await prisma.vehicle.createMany({
  data: [
    // Hatchback vehicles
    { modelName: 'Tata Altroz', vehicleTypeId: hatchback.id, isAvailable: true },
    { modelName: 'Volkswagen Polo', vehicleTypeId: hatchback.id, isAvailable: true },
    { modelName: 'Renault Kwid', vehicleTypeId: hatchback.id, isAvailable: true },

    // SUV vehicles
    { modelName: 'Kia Seltos', vehicleTypeId: suv.id, isAvailable: true },
    { modelName: 'Hyundai Creta', vehicleTypeId: suv.id, isAvailable: true },
    { modelName: 'Jeep Compass', vehicleTypeId: suv.id, isAvailable: true },

    // Sedan vehicles
    { modelName: 'Skoda Octavia', vehicleTypeId: sedan.id, isAvailable: true },
    { modelName: 'Volkswagen Vento', vehicleTypeId: sedan.id, isAvailable: true },
    { modelName: 'Nissan Sunny', vehicleTypeId: sedan.id, isAvailable: true },

    // Cruiser vehicles
    { modelName: 'Yamaha FZ-X', vehicleTypeId: cruiser.id, isAvailable: true },
    { modelName: 'Jawa Forty Two', vehicleTypeId: cruiser.id, isAvailable: true },
    { modelName: 'Honda Hness CB350', vehicleTypeId: cruiser.id, isAvailable: true }
  ]
});


    console.log('Seeding completed successfully!');
    console.log(`Created 4 vehicle types`);
    console.log(`Created 12 vehicles`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
