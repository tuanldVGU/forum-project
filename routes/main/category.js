const router = require('express').Router();
const categoryService = require('../../services/categoryService');
const utils = require('../../ultis/ultis');

router.get('/api/category/getDetail', (req, res) => categoryService.getDetail()
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  }));

router.post('/api/category/', (req, res) => {
  const {brand,model,year} =req.body;
  const type ="Motorbike";
  categoryService.addCategory({type,brand,model,year})
  .then(
    // result => res.json(utils.succeed(result))
    res.redirect('/admin/category')
    )
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});

router.delete('/api/category/:id', (req, res) => {
  const id = req.params.id;
  categoryService.deleteCategory(id)
  .then(result => res.json(utils.succeed(result)))
  .catch((err) => {
    return res.json(utils.fail(err, err.message));
  })
});
module.exports = router;
