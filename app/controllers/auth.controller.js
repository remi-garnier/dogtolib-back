const authController = {
  async signin(req, res) {
    res.json({ response: 'signin' });
  },

  async register(req, res) {
    res.json({ response: 'register' });
  },
};

module.exports = authController;
