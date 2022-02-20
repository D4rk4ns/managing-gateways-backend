
const mongoose      = require('mongoose'),
    Schema          = mongoose.Schema;

/*
    Each peripheral device has:
    •	a UID (number),
    •	vendor (string),
    •	date created,
    •	status - online/offline.
*/  


const peripheralSchema = new Schema({

    uid:            {type:Number, required: [true, "The uid is required"]},
    vendor:         {type:String, required: false},
    date:           {type:Date, required:false, default: Date.now},
    statusd:         {type:Boolean, required: false, default: false},
    gateway:        {type: Schema.Types.ObjectId, ref: 'Gateway'}

},{ collection: "peripheral" });

// Sets the date parameter equal to the current time
peripheralSchema.pre('save', next => {

    now = new Date();

    if(!this.date) {
        this.date = now;
    }
    
    next();
});


module.exports = mongoose.model("Peripheral", peripheralSchema);