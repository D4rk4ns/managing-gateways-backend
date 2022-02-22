const mongoose = require('mongoose'),
    config   = require('config'); 
    
    require('dotenv').config();

    mongoose.connection.openUri(process.env.ATLAS_URI , (err, res) => {
        if (err.code === 'ERR_UNHANDLED_REJECTION') throw 'Check your AtlasDB network configuration';
        if (err) throw err.message;

        console.log('Database: \x1b[32m%s\x1b[0m', 'online');

    });
module.exports = mongoose;

