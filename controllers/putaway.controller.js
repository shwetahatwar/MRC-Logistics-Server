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
    scanStatus: 0
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
  let putawayMaterial = {
    "scanStatus":1,
    "briotDateTime":timeStamp
  }
  console.log("Req body",req.body);
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
      console.log("Num",num);
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

exports.getPutawayCountDashboard = async (req, res) => {
  // var countTable=[];
  // var totalCount=0;
  // var putawayCount=0;
  // await Putaway.count({
    
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
  // await Putaway.count({
  //   where:{
  //     scanStatus:1
  //   }
  // }).then(data => {
  //   putawayCount = data;
  //   let putawayCounts = {
  //     'putawayCount':data
  //   };
  //   countTable.push(putawayCounts);
  // }).catch(err => {
  //   res.status(500).send({
  //     message:
  //     err.message || "Some error occurred while retrieving count."
  //   });
  // });
  
  // let pendingCount =  totalCount - putawayCount;
  // let pendingCountArray = {
  //   'pendingCount':pendingCount
  // };
  // countTable.push(pendingCountArray);
  // res.status(200).send({
  //   countTable
  // });  

  var totalCount = 0;
  var pendingCount = 0;
  var putawayCount = 0;
  
  await Putaway.count({
    where:{
      scanStatus:1
    }
  }).then(data=>{
    putawayCount = data;
  })
  
  await Putaway.count({
  
  }).then(data=>{
    totalCount = data;
  })
  
  pendingCount = totalCount - putawayCount;
  var response = {
    totalCount:totalCount,
    pendingCount:pendingCount,
    putawayCount:putawayCount
  }
  res.status(200).send(response);

};