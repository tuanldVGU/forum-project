const router = require('express').Router();
const category = require('./category');
const comment = require('./comment');
const subComment = require('./subComment');
const post = require('./post');


router.use('/', category);
router.use('/', comment);
router.use('/', post);
router.use('/', subComment);
router.get('/', (req, res) => res.render('main/index'));

module.exports = router;
