const router = require('express').Router();
const userService = require('../../services/userService');
const utils = require('../../ultis/ultis');

router.get('/api/user/getDetail/:id', (req, res) => userService.getDetail(req.params.id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

module.exports = router;
