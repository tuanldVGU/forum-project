const router = require('express').Router();
const subCommentService = require('../../services/subCommentService');
const utils = require('../../ultis/ultis');

router.get('/api/subComment/getDetail', (req, res) => subCommentService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
router.post('/api/comment/createSubComment', (req, res) => {
  // console.log(req.body.data);
  const {post, comment, content} = req.body.data;
  // console.log(post);
  // console.log(user);
  // console.log(content);
  //console.log(token);
  const user = jwt.verify(token,key.secret).userID;

  return subCommentService.createSubComment({ post, comment, user, content })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});

module.exports = router;
