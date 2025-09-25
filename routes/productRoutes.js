const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getMansCollection,
  postProduct,
  updateProductById,
  deleteProductById,
  getPOPULARINWOMEN,
  getNewColletion
} = require('../controller/productController');

router.get('/', getAllProducts);
router.get('/women', getPOPULARINWOMEN);
router.get('/men',getMansCollection);
router.get('/kids',getNewColletion);
router.get('/:id', getProductById);
router.post('/', postProduct); // Create
router.put('/:id', updateProductById); // Update
router.delete('/:id', deleteProductById); // Delete

module.exports = router;
