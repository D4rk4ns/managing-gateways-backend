const Gateway = require("../models/gateway");
const Peripheral = require('../models/peripheralDevice');

//===================================================
//Get all the Gateways
//===================================================

function getGateways(req, res){

    Gateway.find({},"-_id -__v")
    .exec (

        (err, gateways) =>{

            if(err){
                return res.status(400).json({
                    errors: err.message
                });
            }

        res.status(200).json({
            ok          : true,
            gateways    : gateways
        });
});

}

//===================================================
//===================================================


//===================================================
//Get a Gateway
//===================================================

function getGateway(req, res){

    let body = req.params;
    
    Gateway.findById(body.id)
        .populate('peripheralDevice', '-_id -__v')
    
        .exec (
            (err, gateways) =>{

        if(err){
            return res.status(400).json({
                errors: {message: 'Error loading the information of the gateway'}
            });
        }

        return res.status(200).json({
            ok: true,
            gateways: gateways
        });
    });
}

//===================================================
//===================================================

//===================================================
//Create a new Gateway
//===================================================

function createGateway(req, res){
    const body    = req.body;
    
    const gateway = new Gateway({

            serialNumber        : body.serialNumber,
            gatewayName         : body.gatewayName,
            address             : body.address,
            peripheralDevice    : body.peripheralDevice
        });

        if(body.serialNumber == undefined){
            return res.status(400).json({
                errors: {message: 'You must enter the serial number'}
            });
        }
    
        if(!isValidIP(body.address)){
            return res.status(400).json({
                errors: {message: 'Please enter a correct ip address'}
            });
        }
        
            gateway.save((err, savedGateway) => {
                if(err && err.message.includes("E11000")){
                    return res.status(400).json({
                        errors: "The serial number must be unique"
                    });
                }
                if(err){
                    return res.status(400).json({
                        errors: err.message
                    });
                }
                return res.status(200).json({
                    message: "Gateway successfully added!",
                    gateways: savedGateway
                });
            });
    }

//===================================================
//===================================================

//===================================================
//Update a Gateway
//===================================================

function updateGateway(req, res) {

    const id = req.params.id,
        body = req.body;
        
        Gateway.findById(id, (err, gateway) => {

        if (err) {
            return res.status(400).json({
                errors: err.message
            });
        }

        if (!gateway) {
            return res.status(404).json({
                errors: { message: 'No gateway exists with this ID' }
            });
        }
        
        gateway.serialNumber = body.serialNumber || gateway.serialNumber;
        gateway.gatewayName  = body.gatewayName  || gateway.gatewayName;
        
        if(!body.address) gateway.address = gateway.address;
        
        else if(isValidIP(body.address)) gateway.address = body.address;

        else {
            return res.status(400).json({
                errors: { message: 'Please enter a correct ip address' }
            });
        }

        if(!body.peripheralDevice){
            gateway.peripheralDevice = gateway.peripheralDevice;
        }
        else{
            res.status(404).json({
                errors: {message: "You can't perform this operation here"}
            });
        }

        gateway.save((err, savedGateway) => {
            if (err) {
                return res.status(400).json({
                    errors: err.message
                });
            }

            res.status(200).json({
                message: "Gateway updated!",
                gateways: savedGateway
            });
        });

    });
}


//===================================================
//===================================================

//===================================================
//Delete a Gateway
//===================================================

function deleteGateway(req, res){
    const id   = req.params.id;
        

    Gateway.findByIdAndRemove(id, (err, deletedGateway)=>{
        
        if(err){
            return res.status(400).json({
                errors: err.message
            });
        }

        if(!deletedGateway){
            return res.status(404).json({
                errors: {message: 'No gateway exists with this ID'}
            });
        }



        res.status(200).json({
            ok          : true,
            message     : "Gateway successfully deleted!",
            gateways     : deletedGateway
        });
    });
}

//===================================================
//===================================================


//===================================================
//Add a Peripheral device to a Gateway
//===================================================

function addPeripheral(req, res){
    const id = req.params.id,
        body   = req.body;

    Gateway.findById(id, (err, gateway)=>{
        
        if(err){
            return res.status(400).json({
                errors: err.message
            });
        }

        if(!gateway){
            return res.status(404).json({
                errors: {message: 'No gateway exists with this ID'}
            });
        }

        if(!body.peripheralDevice){
            return res.status(400).json({
                errors: {message: "Please don't forget the Peripheral Device you want to add"}
            });
        }

        if(gateway.peripheralDevice.length <= 10 && !gateway.peripheralDevice.includes(body.peripheralDevice)){ 
            gateway.peripheralDevice.push(body.peripheralDevice);
        }

        else {
            return res.status(400).json({
                errors: { message: 'The peripheral device you want to add already exists' }
            });
        }

        gateway.save((err, addedGateway) => {
            if (err) {
                return res.status(400).json({
                    errors: err.message
                });
            }

            res.status(200).json({
                ok          : true,
                message     : "Peripheral device successfully added to the list!",
                gateways     : addedGateway
            });
        });
        
    });
}

//===================================================
//===================================================


//===================================================
//Remove a Peripheral device of a Gateway
//===================================================

function removePeripheral(req, res){
    const id = req.params.id,
        body   = req.body;

    Gateway.findById(id, (err, gateway)=>{
        
        if(err){
            return res.status(400).json({
                errors: err.message
            });
        }

        if(!gateway){
            return res.status(404).json({
                errors: {message: 'No gateway exists with this ID'}
            });
        }

        if(!body.peripheralDevice){
            return res.status(400).json({
                errors: {message: "Please don't forget the Peripheral Device you want to remove"}
            });
        }

        if(!gateway.peripheralDevice.includes(body.peripheralDevice)){
            return res.status(400).json({
                errors: {message: "The Peripheral Device you want to remove doesn't exist in the list"}
            });
        }

        if(body.peripheralDevice && gateway.peripheralDevice.includes(body.peripheralDevice)){ 
            gateway.peripheralDevice.splice(gateway.peripheralDevice.indexOf(body.peripheralDevice));
        }

        gateway.save((err, removedGateway) => {
            if (err) {
                return res.status(400).json({
                    errors: err.message
                });
            }
            res.status(200).json({
                ok          : true,
                message     : "Peripheral device successfully removed of the list!",
                gateways     : removedGateway
            });
        });
    });
}

//===================================================
//===================================================

//===================================================
//Small function to validate the IPv4 structure
//===================================================

function isValidIP(str) {
    let isIpv4 = str.split('.');
    if(isIpv4.length != 4)
        return false;

    for(i in isIpv4){
        if(!/^\d+$/g.test(isIpv4[i]) ||+isIpv4[i]>255 ||+isIpv4[i]<0 ||/^[0][0-9]{1,2}/.test(isIpv4[i]))
        return false;
    }

    return true;

}

//===================================================
//===================================================


module.exports = {
    getGateways,
    getGateway,
    createGateway,
    updateGateway,
    deleteGateway,
    addPeripheral,
    removePeripheral
};
