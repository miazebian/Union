//const Document = require('./Models/DocumentSchema')
const mongoose = require('mongoose');

const MaraigeCertificateSchema = new mongoose.Schema({
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
    Authority:
    {
        type: String,
        required: true
    },
    CertificateDocument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    }
},
{
    timestamps: true
},
{
    collection: 'MaraigeCertificateInfo'
});

module.exports = MaraigeCertificate = mongoose.model('MaraigeCertificateInfo', MaraigeCertificateSchema);