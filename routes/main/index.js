const router = require('express').Router();
const category = require('./category');

router.use('/', category);
router.get('/', (req, res) => res.render('main/index'));

module.exports = router;
