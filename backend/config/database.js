const mongoose = require('mongoose'),
      config   = require('config'); //we load the db location from the JSON files
    

    mongoose.connection.openUri(config.DBHost , (err, res) => {

        if (err) throw err.message;

        console.log('Database: \x1b[32m%s\x1b[0m', 'online');

    });
module.exports = mongoose;

