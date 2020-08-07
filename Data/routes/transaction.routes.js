var express = require('express');
var router = express.Router();
var transactions = require('../controllers/transaction.controller');

router.post("/",transactions.create);
// router.get("/",transactions.findAll);
// router.get("/:id",transactions.findOne);
// router.put('/:id',transactions.update);

module.exports = router;