const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

  var materialBarcode = req.body.materialBarcode;
  var userId = req.body.userId;
  var sapCode;
  var oldCode;
  var finish;
  var desc;
  var custPart;
  var qtyOfPack;
  var packCode;
  var unitWeight;
  var netWeight;
  var grossWeight;
  var refNumber;
  var packDate;
  var printDate;
  var packNumber;

  
  const audit = {
    sapCode: sapCode,
    oldCode: oldCode,
    finish:finish,
    desc:desc,
    custPart:custPart,
    qtyOfPack:qtyOfPack,
    packCode:packCode,
    unitWeight:unitWeight,
    netWeight:netWeight,
    grossWeight:grossWeight,
    refNumber:refNumber,
    packDate:packDate,
    printDate:printDate,
    packNumber:packNumber,
    userId:userId
  };

  await Audit.create(audit)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Error",err["errors"][0]["message"]);
    res.status(500).send({
      message:
      err["errors"][0]["message"] || "Some error occurred while creating the MaterialInward."
    });
  });
  
};