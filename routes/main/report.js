const router = require('express').Router();
const reportService = require('../../services/reportService');
const utils = require('../../ultis/ultis');
const jwt = require('jsonwebtoken');
const key = require('../../config/jwt');

router.get('/api/report/getDetail/:id', (req, res) => reportService.getDetail(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    //return res.json(req);
    return res.json(utils.fail(err, err.message));
  }));
router.get('/api/report/getAllDetail', (req, res) => reportService.getAllDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    //return res.json(req);
    return res.json(utils.fail(err, err.message));
  }));
//router.post('/api/report/createreport', (req, res) => {
  //const { postId,reason,reporter,author} = req.body;
 // res.send(req.body)
  //const user =jwt.verify(author,"secrettoken").userID;
  //return postService.createPost({ category, forumList, user, title, description })
    //.then(() => res.send(utils.succeed()))
    //.catch(err => res.send(utils.fail(err, err.message)));
//});
module.exports = router;
