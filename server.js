/****	Statements 	***/
const express           = require('express'),
    app                 = express(),
    dotenv              = require('dotenv').config(),
    mongoose            = require('mongoose'),
    port                = process.env.PORT || 3000,
    uri                 = process.env.ATLAS_URI,
    morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    cors                = require('cors'),
    helmet              = require('helmet'),
    config              = require('config'); 

/****	Statements 	***/

app.set('port', port);
app.disable('x-powered-by');


/****	Database connection 	***/
    mongoose.connect(uri);
    mongoose.connection.once('open', () => {
        console.log('Database: online');
    });

/****	Database connection 	***/

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
app.use('/', gatewayRoutes);
app.use('/', peripheralDeviceRoutes);


/****	Routes 	***/

/****	Heroku purposes only 	***/
const favicon = require("express-favicon");
const path    = require("path");

// __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(favicon("./src/favicon.ico"));
app.use(express.static(path.join(__dirname, "src")));

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, "src", "index.html"));
});
/****	Heroku purposes only 	***/



/***  Puerto de Escucha ***/
app.listen(
    app.get("port"),
    () => {
        console.info("✅  Server started on port", app.get("port"));
    }
);

module.exports = app; //for testing
