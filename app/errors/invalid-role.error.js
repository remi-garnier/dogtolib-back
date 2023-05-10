module.exports = class InvalidRoleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidRoleError';
    this.code = 'INVALID_ROLE';
    this.status = 401;
  }
};
