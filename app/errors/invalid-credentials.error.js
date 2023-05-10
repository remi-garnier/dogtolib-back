module.exports = class InvalidCredential extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.code = 'InvalidCredentials';
    this.status = 401;
  }
};
