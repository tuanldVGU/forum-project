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
  })
});

router.get('/api/user/getAllDetail/', (req, res) => {
  userService.getAllDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});

router.put('/api/user/updateRole/:id', (req, res) => {
  const userId = req.params.id;
  const role = req.body.role;
  userService.updateRole(userId,role)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});

router.delete('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  userService.deleteUser(userId)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});

router.post('/api/user/avatar/', (req, res) => {
  const sentData = {
    userID: jwt.verify(req.body.userID,key.secret).userID,
    fileUpload: req.body.fileUpload
  };
  userService.addAvatar(sentData)
  .then(
    // result => res.json(utils.succeed(result))
    res.send('<h1>Success</h1><h2>Please signin again to update avatar.</h2>')
    )
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});

module.exports = router;
