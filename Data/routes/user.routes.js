var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller');

router.post("/",users.create);
router.get("/",users.findAll);
// router.get("/:id",users.findOne);
router.post("/sign_In",users.sign_in);

module.exports = router;