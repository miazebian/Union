const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    DocumentName: {
        type: String,
        required: true
    },
    DocumentPath: {
        type: String,
        required: true
    },
    DocumentSize: {
        type: Number,
        required: true
    },
    DocumentType: {
        type: String,
        required: true
    },
    DocumentDate: {
        type: Date,
        required: true
    },
    DocumentURL: {
        type: String,
        required: true
    },
    ParentUrl: {
        type: String,
        required: true
    },
    AccountID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }
},
{
    timestamps: true
},
{
    collection: 'DocumentInfo'
});
const MaraigeDocumentsSchema = new mongoose.Schema({
    DriverLicense: DocumentSchema,
    BirthCertificate: DocumentSchema,
    PassPort: DocumentSchema,
    MarriageCertificate: DocumentSchema,
    DivorceCertificate: DocumentSchema,
    DeathCertificate: DocumentSchema,
    OtherDocument: DocumentSchema
},
{
    timestamps: true
},
{
    collection: 'MaraigeDocumentsInfo'
});


const ParentInfoSchema = new mongoose.Schema({

    FatherFirstName: {
        type: String,
        required: true
    },
    FatherMiddleName: {
        type: String,
        required: false
    },
    FatherLastName: {
        type: String,
        required: true
    },
    FatherDateOfBrith: {
        type: Date,
        required: true
    },
    MotherFirstName: {
        type: String,
        required: true
    },
    MotherMiddleName: {
        type: String,
        required: false
    },
    MotherLastName: {
        type: String,
        required: true
    },
    MotherDateOfBrith: {
        type: Date,
        required: true
    }
},{

    timestamps: true
},
{
    collection: 'ParentInfo'
}

);

const MemberDetailSchema= new mongoose.Schema({
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
    SocialSecurityNumber: {
        type: String,
    },
    Gender:
    {
        type: String,
        required: false
    },
    Country_of_Origin: {
        type: String,
        required: true
    },
    Marital_Status:
    {
        type: Number,
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
    Profile_Picture: {
        type: String
    },
    AccountID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    ParentInfo: ParentInfoSchema
},
{
    timestamps: true
},
{
    collection: 'MemberInfo'
})
MemberDetailSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) {
      return null; // No ratings yet
    }
    const sum = this.ratings.reduce((acc, rating) => acc + rating.star, 0);
    this.OverAllRating = sum / this.ratings.length;
    return sum / this.ratings.length;
  });
const Documents = mongoose.model('DocumentInfo', DocumentSchema);
const MaraigeDocuments = mongoose.model('MaraigeDocumentsInfo', MaraigeDocumentsSchema);
const MemberInfo = mongoose.model('MemberInfo', MemberDetailSchema);
const Parents = mongoose.model('ParentInfo', ParentInfoSchema);
module.exports = {MemberInfo, Parents, MaraigeDocuments, Documents};
