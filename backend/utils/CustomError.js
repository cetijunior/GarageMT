class CustomError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status || 500; // Default to 500 Internal Server Error
    }
  }
  
  module.exports = CustomError;
  