var express = require('express');
var router = express.Router();
var putaways = require('../controllers/putaway.controller');

router.post("/",putaways.create);
router.get("/",putaways.findAll);
router.get("/scanned",putaways.findScannedAll);
router.post('/post/update',putaways.update);
router.get("/get/dashboardCount",putaways.getPutawayCountDashboard);

module.exports = router;