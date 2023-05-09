const authController = {
  signin: function async(req, res) {
    res.json({ response: 'signin' });
  },

  register: function async(req, res) {
    res.json({ response: 'register' });
  },
};

module.exports = authController;
