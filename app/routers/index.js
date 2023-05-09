const express = require('express');
const aminalRouter = require('./animal.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const reminderRouter = require('./reminder.router');
const veterinaryRouter = require('./veterinary.router');

const router = express.Router();

router.use('/animal', aminalRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/reminder', reminderRouter);
router.use('/veterinary', veterinaryRouter);

router.use(() => {
  throw new Error('API Route not found', { statusCode: 404 });
});

module.exports = router;