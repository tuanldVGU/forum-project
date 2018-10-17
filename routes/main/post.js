const router = require('express').Router();
const postService = require('../../services/postService');
const utils = require('../../ultis/ultis');
const jwt = require('jsonwebtoken');
const key = require('../../config/jwt');

router.get('/api/post/getDetail/:id', (req, res) => postService.getDetail(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    //return res.json(req);
    return res.json(utils.fail(err, err.message));
  }));

router.get('/api/post/getAllDetail', (req, res) => postService.getAllDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    //return res.json(req);
    return res.json(utils.fail(err, err.message));
  }));


router.get('/api/post/getPost/:id', (req, res) => postService.getPost(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.get('/api/post/getUserPost/:id', (req, res) =>{
  const userId = jwt.verify(req.params.id,key.secret).userID;
  postService.getUserPost(userId)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })});

router.get('/api/post/getSumPost', (req, res) => postService.getSumPost()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
  );

router.post('/api/post/createPost', (req, res) => {
  const { category, forumList, title, description , author} = req.body;
    const user =jwt.verify(author,"secrettoken").userID;
  return postService.createPost({ category, forumList, user, title, description })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});
// router.get('/api/post/searchPost/:categoryid/:title',(req,res)=>
// postService.searchPost(req.params.categoryid,req.params.title)
// .then(result => res.json(utils.succeed(result)))
// .catch((err) => {
//   return res.json(utils.fail(err, err.message));
// }));

router.post('/api/post/deletePost', (req, res) => {
  const { postId, forumId} = req.body;
  return postService.deletePost({ postId, forumId })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});


module.exports = router;
