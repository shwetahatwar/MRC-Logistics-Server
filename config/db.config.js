
module.exports = {
  HOST: "192.168.0.207",
  USER: "mrcwms",
  PASSWORD: "Mrcwms%1",
  DB: "MRCWMSAutomation",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};