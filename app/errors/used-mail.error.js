module.exports = class UsedMailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UsedMailError';
    this.code = 'USED_MAIL';
    this.status = 400;
  }
};
