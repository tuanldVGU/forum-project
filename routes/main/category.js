const router = require('express').Router();
const categoryService = require('../../services/categoryService');
const utils = require('../../ultis/ultis');

router.get('/api/category/getDetail', (req, res) => categoryService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
module.exports = router;
