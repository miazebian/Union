const { required } = require('joi');
const mongoose = require('mongoose');

const MaraigeApplicationSchema = new mongoose.Schema({
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
    Documents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaraigeDocuments',
        required: true
    },   
},
{
    timestamps: true
},
{
    collection: 'MaraigeApplicationInfo'
});

module.exports = MaraigeApplication = mongoose.model('MaraigeApplication', MaraigeApplicationSchema);