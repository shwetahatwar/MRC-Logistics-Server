var express = require('express');
var router = express.Router();
var materialinwards = require('../controllers/materialinward.controller');

router.post("/",materialinwards.create);
router.get("/",materialinwards.findAll);
// router.get("/:id",materialinwards.findOne);
// router.put('/:id',materialinwards.update);

module.exports = router;