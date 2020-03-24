var express = require('express');
var router = express.Router();
var putaways = require('../controllers/putaway.controller');

router.post("/",putaways.create);
router.get("/",putaways.findAll);
router.put('/:id',putaways.update);

module.exports = router;