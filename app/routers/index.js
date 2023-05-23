const express = require('express');
const aminalRouter = require('./animal.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const reminderRouter = require('./reminder.router');
const veterinaryRouter = require('./veterinary.router');
const favoriteRouter = require('./favorite.router');
const authMiddleware = require('../middlewares/auth.middleware');
const Dogtoliberror = require('../errors/dogtolib-error');

const router = express.Router();

router.use('/animal', authMiddleware.checkToken, aminalRouter);
router.use('/auth', authRouter);
router.use('/profile', authMiddleware.checkToken, profileRouter);
router.use('/reminder', authMiddleware.checkToken, reminderRouter);
router.use('/veterinary', authMiddleware.checkToken, veterinaryRouter);
router.use('/favorite', authMiddleware.checkToken, favoriteRouter);

router.use(() => {
  throw new Dogtoliberror('API Route not found', 404);
});

module.exports = router;
