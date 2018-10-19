const router = require('express').Router();
const commentService = require('../../services/commentService');
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

router.get('/api/comment/getDetail/:id', (req, res) => commentService.getDetail(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.get('/api/comment/getSumComment/:id', (req, res) => commentService.getSumComment(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.post('/api/comment/createComment', (req, res) => {
  // console.log(req.body.data);
  const {post, token, content} = req.body.data;
  const user = jwt.verify(token,key.secret).userID;

  return commentService.createComment({ post, user, content })
    .then(
      result => {
        // console.log(result);
        // real-time function
        pusher.trigger('motor-forum', 'add-comment', {
          id: result._id,
          postID: result.post,
          content: result.content 
        });
        res.json(utils.succeed(result))
      })
    .catch(err => res.send(utils.fail(err, err.message)));
});
// router.post('/api/comment/deleteComment',(req,res)=>{
//     const { commentId, postId}=req.body.data;
//     console.log(commentId, postId);
// })

module.exports = router;
