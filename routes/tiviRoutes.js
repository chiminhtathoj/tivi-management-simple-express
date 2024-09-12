const express = require('express');
const router = express.Router();
const tiviController = require('../controllers/tiviController');

router.get('/all', tiviController.getAllTivi);
router.get('/filter', tiviController.filterTivi);
router.get('/nhom-tivi', tiviController.getNhomTivi);

module.exports = router;
