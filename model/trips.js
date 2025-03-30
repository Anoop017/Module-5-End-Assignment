const mongoose = require('mongoose')
const travelSchema = new mongoose.Schema({
    destination : {
        type : String,
        required: true,
    },
    startDate : {
        type : Date,
    },
    endDate : {
        type:Date,
    },
    activities : {
        type : [String],
        default : []
    }
});

const Trip = mongoose.model('Trip', travelSchema)
module.exports = Trip