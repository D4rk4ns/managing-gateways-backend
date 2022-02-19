const express = require('express'),
    gatewayController = require('../controllers/gatewayController'),
    api = express.Router();

//===================================================
//Endpoint - Get all the Gateways
//===================================================
api.get('/gateway', gatewayController.getGateways);

//===================================================
//Endpoint - Get a Gateway
//===================================================
api.get('/gateway/:id', gatewayController.getGateway);

//===================================================
//Endpoint - Create a new Gateway
//===================================================
api.post('/gateway', gatewayController.createGateway);

//===================================================
//Endpoint - Update a Gateway
//===================================================
api.put('/gateway/:id', gatewayController.updateGateway);

//===================================================
//Endpoint - Delete a Gateway
//===================================================
api.delete('/gateway/:id', gatewayController.deleteGateway);

//===================================================
//Endpoint - Add a Peripheral device to a Gateway
//===================================================
api.put('/gateway/:id/add', gatewayController.addPeripheral);

//===================================================
//Endpoint - Remove a Peripheral device of a Gateway
//===================================================
api.delete('/gateway/:id/remove', gatewayController.removePeripheral);

module.exports = api;