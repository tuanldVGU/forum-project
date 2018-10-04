const router = require('express').Router();
const auth = require('./auth');
const main = require('./main');
function requireLogin(req, res, next) {
  const returnUrl = encodeURIComponent(req.originalUrl);
  let loginUrl;

  if (req.path === '/') {
    loginUrl = `/signin`;
  }

  return res.redirect(loginUrl);
}

router.use('/', auth);
router.use(requireLogin);
router.use('/', main);

module.exports = router;
