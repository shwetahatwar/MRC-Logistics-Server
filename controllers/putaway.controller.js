const db = require("../models");
const Putaway = db.putaways;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // console.log(req.body);

  // // Create a putawayMaterial
  const putawayMaterial = {
    rackBarcodeSerial: req.body.rackBarcodeSerial,
    binBarcodeSerial: req.body.binBarcodeSerial,
    materialBarcodeSerial: req.body.materialBarcodeSerial,
    mrcDateTime: req.body.mrcDateTime,
    briotDateTime:req.body.briotDateTime,
    userId:req.body.userId,
    status: 0
  };

  // Save putawayMaterial in the database
  await Putaway.create(putawayMaterial)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Error",err["errors"][0]["message"]);
    res.status(500).send({
      message:
      err["errors"][0]["message"] || "Some error occurred while creating the putawayMaterial."
    });
  });
  
};

exports.findAll = (req, res) => {
  console.log("query",req.query );
  Putaway.findAll({ 
  	where: req.query 
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving users."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  var dateToday = new Date();
  var dt = new Date(dateToday);
  var timeStamp = dt.setSeconds( dt.getSeconds());
  let putawayMaterial = {
    "status":1,
    "briotDateTime":timeStamp
  }
  if(req.body.materialBarcodeSerial == null || req.body.materialBarcodeSerial == undefined || req.body.materialBarcodeSerial == ""){
    Putaway.update(putawayMaterial, {
      where: {
        rackBarcodeSerial:req.body.rackBarcodeSerial,
        binBarcodeSerial:req.body.binBarcodeSerial
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
  }
  else{
    Putaway.update(putawayMaterial, {
      where: {
        rackBarcodeSerial:req.body.rackBarcodeSerial,
        binBarcodeSerial:req.body.binBarcodeSerial,
        materialBarcodeSerial:req.body.materialBarcodeSerial
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
  }
    
};