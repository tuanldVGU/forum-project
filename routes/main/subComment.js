const router = require('express').Router();
const subCommentService = require('../../services/subCommentService');
const utils = require('../../ultis/ultis');
const jwt = require('jsonwebtoken');
const key = require('../../config/jwt');

router.get('/api/subComment/getDetail', (req, res) => subCommentService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));
router.post('/api/comment/createSubComment', (req, res) => {
  // console.log(req.body.data);
  const {post, token, comment, content} = req.body.data;
  // console.log(post);
  // console.log(content);
  // console.log(token);
  console.log(comment);
  const user = jwt.verify(token,key.secret).userID;

  return subCommentService.createSubComment({ post, comment, user, content })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});

module.exports = router;
