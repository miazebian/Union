const mongoose = require('mongoose')

const UserDetailSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Profile_Picture: {
        type:String
    },
    Accountype: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}, {
    collection: 'AccountInfo'
});

module.exports = Account = mongoose.model('AccountInfo', UserDetailSchema);