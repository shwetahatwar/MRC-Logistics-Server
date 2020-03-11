var express = require('express');
var router = express.Router();
var pickings = require('../controllers/picking.controller');

router.post("/",pickings.create);
router.get("/",pickings.findAll);
router.put('/:id',pickings.update);

module.exports = router;