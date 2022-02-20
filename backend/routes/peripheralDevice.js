const express = require('express'),
    peripheralDeviceController = require('../controllers/peripheralDeviceController'),
    api = express.Router();

//===================================================
//Endpoint - Get all the Devices
//===================================================
api.get('/device', peripheralDeviceController.getDevices);

//===================================================
//Endpoint - Get a Device
//===================================================
api.get('/device/:id', peripheralDeviceController.getDevice);

//===================================================
//Endpoint - Create a new Device
//===================================================
api.post('/device', peripheralDeviceController.createDevice);

//===================================================
//Endpoint - Update a Device
//===================================================
api.put('/device/:id', peripheralDeviceController.updateDevice);

//===================================================
//Endpoint - Delete a Device
//===================================================
api.delete('/device/:id', peripheralDeviceController.deleteDevice);

module.exports = api;