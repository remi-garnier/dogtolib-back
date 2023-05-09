const debug = require('debug')('app:error');

module.exports = (err, req, res, next) => {
  debug(err);

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection refused' });
  }

  if (err.cause === 404) {
    return res.status(404).json({ error: 'API Route not found' });
  }

  return res.status(500).json({
    error: err,
  });
};
