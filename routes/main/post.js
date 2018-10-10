const router = require('express').Router();
const postService = require('../../services/postService');
const utils = require('../../ultis/ultis');

router.get('/api/post/getDetail', (req, res) => postService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
module.exports = router;
