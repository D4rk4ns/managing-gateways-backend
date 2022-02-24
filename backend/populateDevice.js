
const   mongoose    = require('./config/database'),
        database    = require('./config/database.js'),
        Peripheral  = require('./models/peripheralDevice');

const vendor = ["DarkCup","DARKEUM","shadesofdark","DarkNiche","TWILKY","darkmar","YOUDARK","scarlike","darkshed","darkbroon",
                "Darkmart","Darkbay","prodark","shadory","DARKFOCUS","DARKBROOK","GREYQUIET","DARKNEST","Darkbeat","shadegdy",
                "darklab","sofdark","Martlike","ICYPUFF","darkdarkly"];

    function main(){

        for(let i = 0; i <= vendor.length; i++){

            peripheral = new Peripheral({
                uid                 : Math.floor(1000 + Math.random() * 90000000),
                vendor              : vendor[i],
                statususd           : Math.random() < 0.5
            });

            peripheral.save().then(() => { console.log('Peripheral successfully created') });
            
        }
    }

    main()

