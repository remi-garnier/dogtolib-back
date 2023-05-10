module.exports = class InvalidCredential extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.code = 'INVALID_CREDENTIALS';
    this.status = 401;
  }
};
