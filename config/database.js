const mongoose = require('mongoose'),
    
    require('dotenv').config();

    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri);
    mongoose.connection.once('open', () => {
        
        
        console.log('Database: \x1b[32m%s\x1b[0m', 'online');

    });
module.exports = mongoose;

