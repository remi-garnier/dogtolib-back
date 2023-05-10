const debug = require('debug')('app:error');

module.exports = (err, req, res, next) => {
  debug(err);

  // Erreur de loggin
  if (err.code === 'InvalidCredentials') {
    return res.status(err.status).json({ error: err.message });
  }

  // Erreur connexion à la base de données
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection refused' });
  }

  // Erreur route non trouvée
  if (err.cause === 404) {
    return res.status(404).json({ error: 'API Route not found' });
  }

  // Par défaut
  return res.status(500).json({
    error: err,
  });
};
