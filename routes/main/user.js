const router = require('express').Router();
const userService = require('../../services/userService');
const utils = require('../../ultis/ultis');
const jwt = require('jsonwebtoken');
const key = require('../../config/jwt');

router.get('/api/user/getDetail/:id', (req, res) => {
  const userId = jwt.verify(req.params.id,key.secret).userID;
  userService.getDetail(userId)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })});
module.exports = router;
