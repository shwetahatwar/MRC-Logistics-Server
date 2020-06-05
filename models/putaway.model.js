'use strict';
module.exports = (sequelize, DataTypes) => {
  const Putaway = sequelize.define("putaway", {
    rackBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    binBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    materialBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
     mrcDateTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    briotDateTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    scanStatus:{
      type:DataTypes.STRING,
      allowNull:true
    },
});
  return Putaway;
};