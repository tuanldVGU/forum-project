const router = require('express').Router();
const postService = require('../../services/postService');
const utils = require('../../ultis/ultis');

router.get('/api/post/getDetail/:id', (req, res) => postService.getDetail(req.params.id)
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

router.get('/api/post/getSumPost', (req, res) => postService.getSumPost()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.post('/api/post/createPost', (req, res) => {
  const { category, forumList, title, description } = req.body;
  const { user } = "5bb79f8d1b91910884c2d529";
  return postService.createPost({ category, forumList, user, title, description })
    .then(() => res.send(utils.succeed()))
    .catch(err => res.send(utils.fail(err, err.message)));
});
module.exports = router;
