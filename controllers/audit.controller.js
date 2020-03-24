const db = require("../models");
const Audit = db.audits;
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

//Create Audit
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
  
  const auditData = {
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
  console.log("Line 45", auditData);

  await Audit.create(auditData)
  .then(async data => {
    var transactionData = {
      materialBarcodeSerial : req.body.materialBarcodeSerial,
      transactionType : "Physical Stock Verification",
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
      materialBarcodeSerial : req.body.materialBarcodeSerial,
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

//Get All Audit
exports.findAll = async (req, res) =>{
  Audit.findAll({ 
    where: req.params
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Audit."
    });
  });
};

// Find a single Audit with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Audit.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Audit with id=" + id
      });
    });
};

//Update Audit by Id
exports.update = (req, res) => {
  const id = req.params.id;

  Audit.update(req.body, {
    where: req.params
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Audit was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Audit with id=${id}. Maybe Audit was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Audit with id=" + id
      });
    });
};