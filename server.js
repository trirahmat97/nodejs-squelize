var express = require('express'),
    app = express(),
    port = process.env.port || 4000,
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var logger = require("./logger/winston");

app.use(morgan('combined', {
    "stream": logger.stream
}));
logger.debug("Overriding 'Express' logger");


var customerRoute = require('./router/router-customer');
customerRoute(app);

var accountRouter = require('./router/router-account');
accountRouter(app);

var transaksiRouter = require('./router/router-transaksi');
transaksiRouter(app);

app.listen(port);
logger.debug('Learn Node JS With Kiddy, RESTful API server started on: ' + port);






// console.log('server aktif and success');