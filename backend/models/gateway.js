
const mongoose          = require('mongoose'),
    ipAddressPlugin = require("mongoose-ip-address");
    Schema              = mongoose.Schema;

/*
    Each gateway has:
    •	a unique serial number (string), 
    •	human-readable name (string),
    •	IPv4 address (to be validated),
    •	multiple associated peripheral devices.
*/  

const gatewaySchema = new Schema({
    serialNumber:       {type:String, unique:true, required: [true, "The serial number is required"]},
    gatewayName:        {type:String, required: false},
    address:            {type:String, required: [true, "The IP address is required"]},
    peripheralDevice:   [{type: Schema.Types.ObjectId, ref: 'Peripheral'}]
    

}, {collection: "gateway"});

gatewaySchema.plugin(ipAddressPlugin, {fields: "address"});

module.exports = mongoose.model("Gateway", gatewaySchema);