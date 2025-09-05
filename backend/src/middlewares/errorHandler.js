const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma validation errors
  if (err.code === 'P2002') {
    return res.sendError('Data already exists', 409);
  }

  // Prisma foreign key constraint errors
  if (err.code === 'P2003') {
    return res.sendError('Referenced data not found', 400);
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.sendError('Record not found', 404);
  }



  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.sendError(message, statusCode);
};

export default errorHandler;
