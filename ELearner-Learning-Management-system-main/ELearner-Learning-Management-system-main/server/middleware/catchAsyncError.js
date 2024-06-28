export const CatchAsyncError = (theFunc) => (req, res, next) => {
  try {
    Promise.resolve(theFunc(req, res, next)).catch(err => {
      throw err; // Throw the error to be caught by the global error handler
    });
  } catch (err) {
    next(err); // Pass the error to the global error handler
  }
};
