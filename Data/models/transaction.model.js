'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    rackBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    binBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialBarcodeSerial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DateTimeBriot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: true
    },
    scanStatus:{
      type:DataTypes.STRING,
      allowNull:true
    },
});
  return Transaction;
};