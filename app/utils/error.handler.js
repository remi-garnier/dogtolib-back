const debug = require('debug')('app:error');

module.exports = (err, req, res, next) => {
  debug(err);

  // Erreurs personnalisées
  if (err.code === 'INVALID_CREDENTIALS'
    || err.code === 'INVALID_TOKEN'
    || err.code === 'INVALID_ROLE'
    || err.code === 'USED_MAIL') {
    return res.status(err.status).json({ error: err.message });
  }

  // Erreur de validation JOI
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.details[0].message });
  }
  // Erreur connexion à la base de données
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection refused' });
  }

  // Erreur favoris déjà existant
  if (err.code === '23505' && err.table === 'account_has_favorite') {
    return res.status(409).json({ error: 'Favorite already exists' });
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
