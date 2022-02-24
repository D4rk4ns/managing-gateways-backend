const mongoose          = require('mongoose'),
    config              = require('config'),
    uri                 = process.env.ATLAS_URI,
    dotenv              = require('dotenv').config();
    

    mongoose.connection.openUri(uri , (err, res) => {

        if (err) throw err.message;

        console.log('Database: online');

    });
module.exports = mongoose;

