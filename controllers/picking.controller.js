const db = require("../models");
const PickingList = db.pickings;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // console.log(req.body);

  // // Create a pickingMaterial
  const pickingMaterial = {
    rackBarcodeSerial: req.body.rackBarcodeSerial,
    binBarcodeSerial: req.body.binBarcodeSerial,
    materialBarcodeSerial: req.body.materialBarcodeSerial,
    mrcDateTime: req.body.mrcDateTime,
    briotDateTime:req.body.briotDateTime,
    userId:req.body.userId,
    scanStatus: 0
  };

  // Save pickingMaterial in the database
  await PickingList.create(pickingMaterial)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Error",err["errors"][0]["message"]);
    res.status(500).send({
      message:
      err["errors"][0]["message"] || "Some error occurred while creating the pickingMaterial."
    });
  });
  
};

exports.findAll = (req, res) => {
  console.log("query",req.query );
  PickingList.findAll({ 
  	where: {
      scanStatus:0
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving picking Items."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
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
  let pickingMaterial = {
    "scanStatus":1,
    "briotDateTime":newDateTimeNow
  }
  PickingList.update(pickingMaterial, {
    where: {
      materialBarcodeSerial:req.body.materialBarcodeSerial
      // rackBarcodeSerial:req.body.rackBarcodeSerial,
      // binBarcodeSerial:req.body.binBarcodeSerial
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Data was updated successfully."
      });
    } else {
      res.status(500).send({
        message: "Error updating data"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating data"
    });
  });
};

exports.getPicklistCountDashboard = async (req, res) => {
  // var countTable=[];
  // var totalCount=0;
  // var pickingCount = 0;
  // await PickingList.count({
    
  // }).then(data => {
  //   totalCount=data;
  //   let totalData = {
  //     'totalCount':data
  //   };
  //   countTable.push(totalData);
  // }).catch(err => {
  //   res.status(500).send({
  //     message:
  //     err.message || "Some error occurred while retrieving count."
  //   });
  // });
  // await PickingList.count({
  //   where:{
  //     scanStatus:1
  //   }
  // }).then(data => {
  //   pickingCount = data;
  //   let pickingCounts = {
  //     'pickingCount':data
  //   };
  //   countTable.push(pickingCounts);
  // }).catch(err => {
  //   res.status(500).send({
  //     message:
  //     err.message || "Some error occurred while retrieving count."
  //   });
  // });
  
  // let pendingCount =  totalCount - pickingCount;
  // let pendingCountArray = {
  //   'pendingCount':pendingCount
  // };
  // countTable.push(pendingCountArray);
  // res.status(200).send({
  //   countTable
  // });  

  var totalCount = 0;
  var pendingCount = 0;
  var pickedCount = 0;
  
  await PickingList.count({
    where:{
      scanStatus:1
    }
  }).then(data=>{
    pickedCount = data;
  })
  
  await PickingList.count({
  
  }).then(data=>{
    totalCount = data;
  })
  
  pendingCount = totalCount - pickedCount;
  var response = {
    totalCount:totalCount,
    pendingCount:pendingCount,
    pickedCount:pickedCount
  }
  res.status(200).send(response);
  
};
