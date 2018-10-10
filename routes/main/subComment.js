const router = require('express').Router();
const subCommentService = require('../../services/subCommentService');
const utils = require('../../ultis/ultis');

router.get('/api/subComment/getDetail', (req, res) => subCommentService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
module.exports = router;
