const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.route('/').post(bookController.create).get(bookController.index);

router
  .route('/:name')
  .get(bookController.find)
  .put(bookController.update)
  .delete(bookController.destroy);

module.exports = router;
