const mongoose = require('mongoose');

const MWitnessDetailSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    MiddleName: {
        type: String,
        required: false
    },
    LastName: {
        type: String,
        required: true
    },
    Gender:
    {
        type: String,
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Country_of_Origin: {
        type: String,
        required: true
    },
    Bank:{
        type:String
    },
    BankAccountNumber:{
        type:String
    },
    CreditCardNumber:{
        type:String
    },
    Profile_Picture:
    {
        type: String,
    },
    Reviews: [{
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        },
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    OverAllRating:
    {
        type: Number

    },
    AccountID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
},
{
    timestamps: true
},
{
    collection: 'MWitnessInfo'
});
MWitnessDetailSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) {
      return null; // No ratings yet
    }
    const sum = this.ratings.reduce((acc, rating) => acc + rating.star, 0);
    this.OverAllRating = sum / this.ratings.length;
    return sum / this.ratings.length;
  });
const Witness = mongoose.model('MWitnessInfo', MWitnessDetailSchema);
module.exports = Witness;

