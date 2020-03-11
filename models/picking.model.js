'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picking = sequelize.define("picking", {
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
      allowNull: false
    },
     mrcDateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    briotDateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: false
    },
     status:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
});
  return Picking;
};