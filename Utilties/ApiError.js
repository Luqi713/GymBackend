class ApiError extends Error {
  constructor(status = 500, message = 'Internal Server Error', data = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

module.exports = ApiError;

/*class ApiError {
    constructor(status = 500, message = 'Internal Server Error', data = null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  
  module.exports = ApiError;
  */