/****	Statements 	***/
const express           = require('express'),
    app                 = express(),
    port                = parseInt(process.env.PORT, 10) || 3000,
    morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    cors                = require('cors'),
    helmet              = require('helmet'),
    { mongoose }        = require('./config/database'),
    config              = require('config'); //we load the db location from the JSON files
/****	Statements 	***/

app.set('port', port);

/****	Middlewares 	***/

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// Adding Helmet to enhance Rest API's security
app.use(helmet());

//Parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// Enabling CORS for all requests
app.use(cors());

/****	Middlewares 	***/


/****	Importing Routes 	***/
let gatewayRoutes = require('./routes/gateway');
let peripheralDeviceRoutes = require('./routes/peripheralDevice');
/****	Importing Routes 	***/

/****	Routes 	***/
app.use('/api', gatewayRoutes);
app.use('/api', peripheralDeviceRoutes);
/****	Routes 	***/


/***  Puerto de Escucha ***/
app.listen(3000, () => {
    console.log('Backend server running in port: ' + port + ', state: \x1b[32m%s\x1b[0m', 'online');
});

module.exports = app; //for testing