const db = require("../models");
const MaterialInward = db.materialinwards;
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

//Create and Save Material Inward
exports.create = async (req, res) => {

  console.log("In");
  console.log(req.body.materialBarcode);
  var materialBarcode = req.body.materialBarcode;
  var userId = req.body.userId;
  var arr    = materialBarcode.split(',');

  var d = new Date();
  var newDay = d.getDate();
  if(newDay.toString().length == 1)
    newDay = "0" + newDay;
  var newMonth = d.getMonth();
  newMonth = newMonth +1;
  if(newMonth.toString().length == 1)
    newMonth = "0" + newMonth;
  var newYear = d.getFullYear();
  var newTimeHrs = d.getHours();
  var newTimeMinutes = d.getMinutes();
  var newTimeSeconds = d.getSeconds();
  var newDateTimeNow = newYear + "." + newMonth + "." + newDay + " " + newTimeHrs + ":" + newTimeMinutes + ":" + newTimeSeconds;
  
  const materialInward = {
    sapCode: arr[0],
    oldCode: arr[1],
    finish:arr[2],
    desc:arr[3],
    custPart:arr[4],
    qtyOfPack:arr[5],
    packCode:arr[6],
    unitWeight:arr[7],
    netWeight:arr[8],
    grossWeight:arr[9],
    refNumber:arr[10],
    packDate:arr[11],
    printDate:arr[12],
    packNumber:arr[13],
    DateTimeBriot:newDateTimeNow,
    userId:userId
  };
  console.log("Line 45", materialInward);

  await MaterialInward.create(materialInward)
  .then(async data => {
    var transactionData = {
      rackBarcodeSerial:"NA",
      binBarcodeSerial:"NA",
      materialBarcodeSerial : materialBarcode,
      transactionType : "MaterialInward",
      userId : req.body.userId,
      scanStatus: "Success",
      DateTimeBriot:newDateTimeNow
    }
    await Transaction.create(transactionData)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err)
    })
    res.send(data);
  })
  .catch(async err => {
    var transactionData = {
      materialBarcodeSerial : materialBarcode,
      transactionType : "MaterialInward",
      userId : req.body.userId,
      scanStatus: "Failed",

    }
    await Transaction.create(transactionData)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err)
    })
    console.log("Error",err["errors"][0]["message"]);
    res.status(500).send({
      message:
      err["errors"][0]["message"] || "Some error occurred while creating the MaterialInward."
    });
  });
  
};

//Get All Material Inward
exports.findAll = async (req, res) =>{
  MaterialInward.findAll({ 
    where: req.params
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving MaterialInward."
    });
  });
};

// Find a single MaterialInward with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MaterialInward.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving MaterialInward with id=" + id
      });
    });
};

//Update Material Inward by Id
exports.update = (req, res) => {
  const id = req.params.id;

  MaterialInward.update(req.body, {
    where: req.params
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MaterialInward was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update MaterialInward with id=${id}. Maybe MaterialInward was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating MaterialInward with id=" + id
      });
    });
};