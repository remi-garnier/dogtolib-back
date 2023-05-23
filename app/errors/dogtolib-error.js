module.exports = class Dogtoliberror extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'DogtolibError';
    this.status = status;
  }
};
