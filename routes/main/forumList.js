const router = require('express').Router();
const forumListService = require('../../services/forumListService');
const utils = require('../../ultis/ultis');

router.get('/api/forumList/getDetail', (req, res) => forumListService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
module.exports = router;
