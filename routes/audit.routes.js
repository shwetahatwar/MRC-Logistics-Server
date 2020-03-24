var express = require('express');
var router = express.Router();
var audits = require('../controllers/audit.controller');

router.post("/",audits.create);
// router.get("/",audits.findAll);
// router.get("/:id",audits.findOne);
// router.put('/:id',audits.update);

module.exports = router;