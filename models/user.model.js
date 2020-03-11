'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
     deviceId:{
      type:DataTypes.STRING,
      allowNull:true
    },
    status:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    });
  return User;
};