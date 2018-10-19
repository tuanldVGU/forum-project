const router = require('express').Router();
const subCommentService = require('../../services/subCommentService');
const utils = require('../../ultis/ultis');
const jwt = require('jsonwebtoken');
const key = require('../../config/jwt');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '625402',
  key: 'e0d50cdec56f3482d272',
  secret: '182c4448daaab917182f',
  cluster: 'ap1',
  encrypted: true
});

router.get('/api/subComment/getDetail', (req, res) => subCommentService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.post('/api/comment/createSubComment', (req, res) => {
  const {post, token, comment, content, commentIndex} = req.body.data;
  const user = jwt.verify(token,key.secret).userID;

  return subCommentService.createSubComment({ post, comment, user, content })
    .then(
      result => {
        // console.log(result.subComment);
        // real-time function
        pusher.trigger('motor-forum', 'add-subcomment', {
          postID: post,
          id: result.subComment[result.subComment.length - 1],
          index: commentIndex,
          content: content 
        });
        res.json(utils.succeed(result))
      })
    .catch(err => res.send(utils.fail(err, err.message)));
});

module.exports = router;
