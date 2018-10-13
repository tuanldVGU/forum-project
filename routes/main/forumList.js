const router = require('express').Router();
const forumListService = require('../../services/forumListService');
const utils = require('../../ultis/ultis');

router.get('/api/forumList/getDetail', (req, res) => forumListService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
router.post('/api/forumList/addForum', (req, res) => {
  const { category, forumName } = req.body;
  return forumListService.addForum({ category, forumName })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});
module.exports = router;
