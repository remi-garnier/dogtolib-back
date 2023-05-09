const debug = require('debug')('app:error');

module.exports = (err, req, res, next) => {
  debug(err);

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection refused' });
  }
  return res.status(500).json({
    error: err,
  });
};
