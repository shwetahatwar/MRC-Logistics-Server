
module.exports = {
  HOST: "localhost",
  USER: "nik",
  PASSWORD: "briot123",
  DB: "mrcLogistics",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};