const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('ioeoifjowi');
});

module.exports = router;
