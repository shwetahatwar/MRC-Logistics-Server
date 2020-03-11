const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
    deviceId: req.body.deviceId,
    status: 1
  };
  console.log("user",user);
  // Save User in the database
  await User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("Error",err["errors"][0]["message"]);
      res.status(500).send({
        message:
          err["errors"][0]["message"] || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ 
  	where: req.params
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

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.sign_in = (req, res) => {
  User.findAll({
    where: {
      username: req.body.username,
      password:req.body.password,
      deviceId:req.body.deviceId
    },
  }).then((user) => {
    console.log("Line 48", user[0]["dataValues"]["status"]);
    if(user[0]["dataValues"]["status"] == 0){
      console.log("Line 50", user.status);
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    res.send(user[0]);
  })
  .catch((err) => {
    console.log('err', err);
    if (err) {
      return res.status(401).json({ message: 'Error while authenticating.' });
    }
  });
};