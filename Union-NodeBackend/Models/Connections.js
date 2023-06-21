const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    Receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    Status: {
        type: String,
    }
},
{
    timestamps: true
},
{
    collection: 'Connection'
}

)

module.exports = Connection = mongoose.model('Connection', ConnectionSchema);