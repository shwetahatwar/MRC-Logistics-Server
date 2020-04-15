var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const cors = require("cors");
var morgan = require('morgan');
var winston = require('./config/winston');  


const app = express();
var usersRouter = require('./routes/user.routes');
var pickingsRouter = require('./routes/picking.routes');
var putawaysRouter = require('./routes/putaway.routes');
var materialInwardsRouter = require('./routes/materialinward.routes');
var auditsRouter = require('./routes/audit.routes');

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(morgan('combined', { stream: winston.stream }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/pickings', pickingsRouter);
app.use('/putaways', putawaysRouter);
app.use('/materialinwards', materialInwardsRouter);
app.use('/audits', auditsRouter);

const db = require("./models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BRiOT application." });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});