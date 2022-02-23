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
app.use(cors({origin:'*', exposedHeaders : "Content-Range,0-20/20"}));

/****	Middlewares 	***/


/****	Importing Routes 	***/
let gatewayRoutes = require('./routes/gateway');
let peripheralDeviceRoutes = require('./routes/peripheralDevice');
/****	Importing Routes 	***/

/****	Routes 	***/
app.use('/', gatewayRoutes);
app.use('/', peripheralDeviceRoutes);

app.use("/src", express.static('./src/'));

app.get('/', function (req, res){
    res.sendFile(__dirname+"/index.html");
});

/****	Routes 	***/




/***  Puerto de Escucha ***/
app.listen(3000, () => {
    console.log('Backend server running in port: ' + port + ', state: \x1b[32m%s\x1b[0m', 'online');
});

module.exports = app; //for testing