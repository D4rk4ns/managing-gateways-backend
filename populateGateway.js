
const   mongoose = require('./backend/config/database'),
        database = require('./backend/config/database.js'),
        Gateway  = require('./models/gateway');

const gatewayName = ["Northpass","Martslock","Aysgarth","Addersfield","Dangarnon","Barncombe","Ballachulish",
    "Timeston","Thorpes","Bannockburn","Helmfirth","Pontheugh","Cesterfield","Aramoor","Aynor","Grasmere","Dumbarton",
    "Tamworth","Ballingsmallard","Harmstead","Leefside","Middlesbrough","Eastcliff","Scrabster","Crossroads","Grasmere"];


    function main(){
        for(let i = 0; i <= gatewayName.length; i++){

            gateway = new Gateway({
                serialNumber     : makeSerialNumber(8),
                gatewayName      : gatewayName[i],
                address          : makeIp()
            });

            gateway.save().then(res =>{
                console.log('Gateway successfully created');
            });
            
        }
            
    }

    //Small function to generate a random serial number
    function makeSerialNumber(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

    //Small function to generate a random IPv4 address
    function makeIp(){
        return (Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
    }


    main();