const mongoose = require('mongoose');

const MaraigeLicenseSchema = new mongoose.Schema({
    Bride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MemberInfo'
    },
    Groom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MemberInfo'
    },
    Witness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MWitnessInfo'
    },
    Judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JudgeInfo'
    },
    LicenseNumber: {
        type: String,
        required: true
    },
    LicenseExpiryDate: {
        type: Date,
        required: true
    },
    LicenseIssueDate: {
        type: Date,
        required: true
    },
    Fees:
    {
        type: Number,
        required: true
    }
},
{
    timestamps: true
},
{
    collection: 'MaraigeLicenseInfo'
});

module.exports = MaraigeLicense = mongoose.model('MaraigeLicenseInfo', MaraigeLicenseSchema);
