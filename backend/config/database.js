const mongoose          = require('mongoose'),
    config              = require('config'),
    uri                 = process.env.ATLAS_URI,
    dotenv              = require('dotenv').config();
    

    mongoose.connect(uri);
    mongoose.connection.once('open', () => {
        console.log('Database: online');
    });
    
module.exports = mongoose;

