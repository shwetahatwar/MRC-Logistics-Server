var express = require('express');
var router = express.Router();
var pickings = require('../controllers/picking.controller');

router.post("/",pickings.create);
router.get("/",pickings.findAll);
router.get("/picked",pickings.pickedAll);
router.put('/:id',pickings.update);
router.get("/get/dashboardCount",pickings.getPicklistCountDashboard);

module.exports = router;