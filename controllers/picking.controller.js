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
      err.message || "Some error occurred while retrieving users."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  var dateToday = new Date();
  var dt = new Date(dateToday);
  var timeStamp = dt.setSeconds( dt.getSeconds());
  let pickingMaterial = {
    "scanStatus":1,
    "briotDateTime":timeStamp
  }
  PickingList.update(pickingMaterial, {
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
