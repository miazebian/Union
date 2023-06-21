const mongoose = require('mongoose');

const JudgeDetailSchema = new mongoose.Schema({
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
    DateOfBirth: {
        type: Date,
       required: true
    },
    Gender:
    {
        type: String,
        required: false
    },
    Country_of_Origin:
    {
        type: String,
        required: true
    },
    Court:
    {
        type: String,
        required: true
    },
    Education:
    {
        type: String,
        required: true
    },
    TermStartDate:
    {
        type: Date,
        required: true
    },
    TermEndDate:
    {
        type: Date,
        required: true
    },
    Profile_Picture:
    {
        type: String,
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
    collection: 'JudgeInfo'
})
JudgeDetailSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) {
      return null; // No ratings yet
    }
    const sum = this.ratings.reduce((acc, rating) => acc + rating.star, 0);
    this.OverAllRating = sum / this.ratings.length;
    return sum / this.ratings.length;
  });
  
module.exports = Judge = mongoose.model('JudgeInfo', JudgeDetailSchema);