import { PrismaClient } from '@prisma/client';

let prisma;

if (!prisma) {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

export default prisma;
