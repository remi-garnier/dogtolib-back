module.exports = class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
    this.code = 'INVALID_TOKEN';
    this.status = 401;
  }
};
