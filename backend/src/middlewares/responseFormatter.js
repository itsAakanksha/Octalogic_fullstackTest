const responseFormatter = (req, res, next) => {
  res.sendSuccess = (data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      errors: null
    });
  };

  res.sendError = (message = 'An error occurred', statusCode = 500, errors = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      data: null,
      errors
    });
  };

  next();
};

export default responseFormatter;
