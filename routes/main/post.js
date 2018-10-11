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
module.exports = router;
