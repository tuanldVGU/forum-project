const router = require('express').Router();
const commentService = require('../../services/commentService');
const utils = require('../../ultis/ultis');

router.get('/api/comment/getDetail', (req, res) => commentService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
module.exports = router;
