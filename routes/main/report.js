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
router.post('/api/report/createReport', (req, res) => {
  const { postId,reason,reporter} = req.body;
  //console.log(req.body)
  //console.log(req.body.postId)
  const user =jwt.verify(reporter,"secrettoken").userID;
   return reportService.createReport({ postId,reason,user})
     .then(() => res.send(utils.succeed()))
     .catch(err => res.send(utils.fail(err, err.message)));
});
module.exports = router;
