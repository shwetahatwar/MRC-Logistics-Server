'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define("audit", {
    sapCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true
    },
    oldCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    finish: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    custPart: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qtyOfPack: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unitWeight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    netWeight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grossWeight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    printDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: true
    },
    DateTimeBriot:{
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Audit;
};