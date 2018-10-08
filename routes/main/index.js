const router = require('express').Router();
const home = require('./home');

router.use('/', home);
router.get('/', (req, res) => res.render('main/index'));

module.exports = router;
