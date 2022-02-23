const Peripheral = require('../models/peripheralDevice');
const Gateway    = require('../models/gateway');

    
//===================================================
//Get all the Peripheral Devices
//===================================================

function getDevices(req, res){

    Peripheral.find({},"-_id -__v")
    .exec (
        (err, peripheral) =>{
    
    if(err){
        return res.status(400).json({
            ok: false,
            errors: {message: 'Error loading the list of peripheral devices'}
        });
    }

    res.status(200).json({
        ok          : true,
        peripheral    : peripheral
    });
    
});
}

//===================================================
//===================================================

//===================================================
//Get a Peripheral Device
//===================================================

function getDevice(req, res){

    let body = req.params;

    Peripheral.findById(body.id)
        .exec (
            (err, peripheral) =>{

        if(err){
            return res.status(400).json({
                errors: {message: 'Error loading the information of the peripheral device'}
            });
        }

        return res.status(200).json({
            ok: true,
            peripheral: peripheral
        });
    });
}

//===================================================
//===================================================

//===================================================
//Create a new Peripheral Device
//===================================================

function createDevice(req, res){

    const body     = req.body,
        peripheral = new Peripheral({

            uid             : body.uid,
            vendor          : body.vendor,
            date            : Date.parse(body.date),
            statusd         : body.statusd,
            gateway         : body.gateway
            
        });

        if(body.uid == undefined){
            return res.status(400).json({
                errors: {message: 'You must enter the UID'}
            });
        }

        peripheral.save((err, savedPeripheral) => {
            if(err){
                return res.status(400).json({
                    errors: err.message
                });
            }
            
            res.status(200).json({
                message: "Peripheral device successfully added!",
                peripheral: savedPeripheral
        });
    });
}

//===================================================
//===================================================

//===================================================
//Update a Peripheral Device
//===================================================

function updateDevice(req, res){

    const id     = req.params.id,
        body     = req.body;

        Peripheral.findById(id, (err, peripheral) =>{
        
        if(err){
            return res.status(400).json({
                errors: {message: 'Error searching for the device'}
            });
        }

        if(!peripheral){
            return res.status(404).json({
                errors: {message: 'No peripheral device exists with this ID'}
            });
        }
        
            peripheral.uid              = body.uid                ||  peripheral.uid;
            peripheral.vendor           = body.vendor             ||  peripheral.vendor;
            peripheral.date             = Date.parse(body.date)               ||  peripheral.date;
            peripheral.statusd          = body.statusd            ||  peripheral.statusd;
            peripheral.gateway          = body.gateway            ||  peripheral.gateway;

            peripheral.save((err, savedPeripheral)=>{
                if(err){
                    return res.status(400).json({
                        errors: err.message
                    });
                }

                res.status(200).json({
                    message: "Peripheral device updated!",
                    peripheral: savedPeripheral
            });
        });
            
    });
}

//===================================================
//===================================================

//===================================================
//Delete a Peripheral Device
//===================================================

function deleteDevice(req, res){
    const id = req.params.id;

    Peripheral.findByIdAndRemove(id, (err, deletedPeripheral)=>{
        
        if(err){
            return res.status(400).json({
                errors: err.message
            });
        }

        if(!deletedPeripheral){
            return res.status(404).json({
                errors: {message: 'No peripheral device exists with this ID'}
            });
        }

        res.status(200).json({
            ok          : true,
            message     : "Peripheral device successfully deleted!",
            peripheral: deletedPeripheral
        });
    });

}

//===================================================
//===================================================


//===================================================
//Update Gateway - Peripheral Device relationship
//===================================================

function updateRelationship(gateway, pid){
    Gateway.findById(gateway)
        .exec((err, gateway) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    errors: err.message
                });
            } 
            
            if(gateway.peripheralDevice.includes(pid)){
                gateway.peripheralDevice.splice(gateway.peripheralDevice.indexOf(pid));
            }

        });
}
//===================================================
//===================================================

module.exports = {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice
};
