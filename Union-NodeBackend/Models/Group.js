const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    Receiver: {
        type: Array,
    },
    Status: {
        type: String,
    },
    Name:{
        type: String,
    },
    
},
{
    timestamps: true
},
{
    collection: 'Connection'
}

)

module.exports = Connection = mongoose.model('Group', GroupSchema);