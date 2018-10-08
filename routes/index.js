const router = require('express').Router();
const auth = require('./auth');
const main = require('./main');
function requireLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  const returnUrl = encodeURIComponent(req.originalUrl);
  let loginUrl;

  if (req.path !== '/login') {
    loginUrl = `/login?returnUrl=${returnUrl}`;
  }

  return res.redirect(loginUrl);
}

router.use('/', auth);
// router.use(requireLogin);
// router.use('/', main);
// router.get('/**', (req, res) => res.render('main/index'));

module.exports = router;
