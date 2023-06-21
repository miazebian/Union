const Account = require('../Models/AccountDetail');
const Member = require('../Models/MemberDetails');
const Judge = require('../Models/JudgeDetails');
const Witness = require('../Models/MWitnessDetails');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const joi = require('joi');
const config = require('../config');
const multer = require('multer');
const path = require('path');
const Upload = require('../Services/Upload-Middleware.js');
const fs = require('fs');
module.exports = class AccountService {
    static async Register(req, res) {
        var UploadFile = multer({ 
            storage: Upload.files.storage(), 
            fileFilter: Upload.files.allowedFile }).
            single('file');
        
        UploadFile(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
            // A multer error occurred when uploading the file
            console.log(err);
            return res.status(500).json({ error: 'Error uploading file' });
            } else if (err) {
            // An unknown error occurred
                console.log(err);
                return res.status(500).json({ error: 'Unknown error' });
            }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const Accountype = req.body.Accountype;
        try {
            const existingUser = await Account.findOne({
                email
            });
            if (existingUser) {
                res.status(300);
                console.log('hi')
                return res.send({
                    error: "User already exists"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            if (Accountype == 2) //judge
            {

                const FirstName = req.body.FirstName;
                const MiddleName = req.body.MiddleName;
                const LastName = req.body.LastName;
                const DateOfBirth = req.body.DateOfBirth;
                //console.log(DateOfBirth);
                const Country_of_Origin = req.body.Country_of_Origin;
                const Gender = req.body.Gender;
                const Court = req.body.Court;
                const Education = req.body.Education;
                const TermStartDate = req.body.TermStartDate;
                const TermEndDate = req.body.TermEndDate;
                const Bank = req.body.Bank;
                const AccountNumber = req.body.AccountNumber;
                const CreditCardNumber = req.body.CreditCardNumber;
                const file = req.file;
                console.log(file);
                var imageUrl;
                if(file !== undefined)
                {
                    fs.readFile(file.path, function(err, data) {
                        if (err) throw err;
                        
                        // Access the binary data as a buffer
                        const binaryData = data;
                        const base64Image = binaryData.toString('base64');
                        imageUrl = `data:image/png;base64,${base64Image}`;
                    });
                }

                const judge = await Judge.create({
                    FirstName,
                    MiddleName,
                    LastName,
                    DateOfBirth,
                    Gender,
                    Country_of_Origin,
                    Court,
                    Education,
                    OverAllRating:0,
                    TermStartDate,
                    TermEndDate,
                    Bank:Bank,
                    BankAccountNumber:AccountNumber,
                    CreditCardNumber:CreditCardNumber,
                    Profile_Picture:imageUrl
                });

                const acc = await Account.create({
                    username,
                    email,
                    password: hashedPassword,
                    Profile_Picture:imageUrl,
                    Accountype
                });
                judge.AccountID = acc._id;
                await judge.save();
                //res.session
                console.log("User registered");
                res.status(201);
                return res.send({
                    status: "ok"
                });
            } else if (Accountype == 3) //witness
            {
                const {
                    FirstName,
                    MiddleName,
                    LastName,
                    DateOfBirth = new Date(req.body.DateOfBirth),
                    Gender,
                    Country_of_Origin,
                    Bank,
                    AccountNumber,
                    CreditCardNumber
                } = req.body;
                const file = req.file;
                var imageUrl;
                if(file !== undefined)
                {
                    fs.readFile(file.path, function(err, data) {
                        if (err) throw err;
                        const binaryData = data;
                        const base64Image = binaryData.toString('base64');
                        imageUrl = `data:image/png;base64,${base64Image}`;
                    });
                }
                const wit = await Witness.create({
                    FirstName,
                    MiddleName,
                    LastName,
                    DateOfBirth,
                    Gender,
                    Bank:Bank,
                    BankAccountNumber:AccountNumber,
                    CreditCardNumber:CreditCardNumber,
                    OverAllRating:0,
                    
                    Profile_Picture:imageUrl,
                    Country_of_Origin,
                });
                const acc = await Account.create({
                    username,
                    email,
                    password: hashedPassword,
                    Profile_Picture:imageUrl,
                    Accountype
                });
                wit.AccountID = acc._id;
                await wit.save();
                console.log("User registered");
                res.status(201).json({
                    status: "ok"
                });
            } else if (Accountype == 1) //member
            {
                const FirstName = req.body.FirstName;
                const MiddleName = req.body.MiddleName;
                const LastName = req.body.LastName;
                const DateOfBirth = req.body.DateOfBirth;
                const Gender = req.body.Gender;
                const Country_of_Origin = req.body.Country_of_Origin;
                const SocialSecurityNumber = req.body.SocialSecurityNumber;
                const Marital_Status = req.body.Marital;
                const Bank = req.body.Bank;
                const AccountNumber = req.body.AccountNumber;
                const CreditCardNumber = req.body.CreditCardNumber;
                const file = req.file;
                var imageUrl;
                if(file !== undefined)
                {
                    fs.readFile(file.path, function(err, data) {
                        if (err) throw err;
                        
                        // Access the binary data as a buffer
                        const binaryData = data;
                        const base64Image = binaryData.toString('base64');
                        imageUrl = `data:image/png;base64,${base64Image}`;
                    });
                }
                const mem = await Member.MemberInfo.create({
                    FirstName,
                    MiddleName,
                    LastName,
                    DateOfBirth,
                    Gender,
                    Country_of_Origin,
                    SocialSecurityNumber,
                    OverAllRating:0,
                    Profile_Picture:imageUrl,
                    Bank:Bank,
                    BankAccountNumber:AccountNumber,
                    CreditCardNumber:CreditCardNumber,
                    Marital_Status
                });
                const UserAccount = await Account.create({
                    username,
                    email,
                    password: hashedPassword,
                    Profile_Picture:imageUrl,
                    Accountype
                });
                mem.AccountID = UserAccount._id;
                await mem.save();
                console.log("User registered");
                res.status(201).json({
                    status: "ok"
                });

            } else {
                res.status(400)
                return res.send({
                    error: "Please select a valid account type"
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({
                status: "error"
            });
        }
    });
}
    static async Login(req, res) {
        const {
            username,
            password
        } = req.body;
        try {
            if (!username || !password) {
                return res.status(204).send({
                    error: "Please enter all fields"
                });
            }
            const acc = await Account.find({
                username: username,
            });
            if (acc.length === 0) {
                return res.status(400).send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            const PassHashh = acc[0].password;

            const isMatch = await bcrypt.compare(password, PassHashh);
            if (!isMatch) {
                return res.status(400).send({
                    error: "Your Account was not found! Email or Password were incorrect"
                }); //passwords do not match
            }
            const token = jwt.sign({ id: acc[0]._id }, process.env.JWT_SECRET, {
                expiresIn: 3600
            });
            const {email, Accountype} = acc[0];
            if(acc[0].Accountype == 1)
            {
                const user = await Member.MemberInfo.findOne({
                    AccountID: acc[0]._id
                });
                var imageurl = acc[0].Profile_Picture;
                res.status(201).json({
                    status: "ok",
                    user,
                    email,
                    Accountype,
                    imageurl,
                    token
                });
            }
            else if(acc[0].Accountype == 2)
            {
                const judge = await Judge.findOne({
                    AccountID: acc[0]._id
                });
                var imageurl = acc[0].Profile_Picture;
                res.status(201).json({
                    status: "ok",
                    user:judge,
                    email,
                    Accountype,
                    imageurl,
                    token
                });
            }
            else if(acc[0].Accountype == 3)
            {
                const witness = await Witness.findOne({
                    AccountID: acc[0]._id
                });
                var imageurl = acc[0].Profile_Picture;
                res.status(201).json({
                    status: "ok",
                    user:witness,
                    email,
                    Accountype,
                    imageurl,
                    token
                });
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "error"
            });
        }
    }
    static async Logout(req, res) {
        req.session.destroy();
        res.status(201).json({
            status: "ok"
        });
    }
    static async UpdatePassWord(req, res) {
        const {
            email,
            oldpassword,
            newpassword
        } = req.body;
        try {
            if (!email || !oldpassword || !newpassword) {
                return res.send({
                    error: "Please enter all fields"
                });
            }
           // const passHash = await bcrypt.hash(oldpassword, 10);
            const acc = await Account.findOne(a => a.email == email);
            if (!acc) {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            const PassHashh = acc[0].password;

            const isMatch = await bcrypt.compare(oldpassword, PassHashh);
            if (!isMatch) {
                return res.status(400).send({
                    error: "Your Account was not found! Email or Password were incorrect"
                }); //passwords do not match
            }
            const newpassHash = await bcrypt.hash(newpassword, 10);
            acc.password = newpassHash;
            await acc.save();
            res.status(201).json({
                status: "ok"
            }); {
                console.log(err);
                res.status(500).json({
                    status: "error"
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "error"
            });
        }

    }
    static async UpdateEmail(req, res) {
        const {
            email,
            newemail,
            password
        } = req.body;
        try {
            if (!email || !newemail || !password) {
                return res.send({
                    error: "Please enter all fields"
                });
            }
            const acc = await Account.findOne(a => a.email == email);
            if (!acc) {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            if(bcrypt.compare(password, acc.password) == false)
            {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            acc.email = newemail;
            await acc.save();
            res.status(200).json({
                status: "ok"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "error"
            });
        }
    }
    static async UpdateUsername(req, res) {
        const {
            email,
            newusername,
            password
        } = req.body;
        try {
            if (!email || !newusername || !password) {
                return res.send({
                    error: "Please enter all fields"
                });
            }
            const acc = await Account.findOne({email : email});
            if (!acc) {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            if(bcrypt.compare(password, acc.password) == false)
            {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            acc.username = newusername;
            await acc.save();
            res.status(200).json({
                status: "ok"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "error"
            });
        }
    }
    static async DeleteAccount(req, res) {
        const {
            email,
            password
        } = req.body;
        try {
            if (!email || !password) {
                return res.send({
                    error: "Please enter all fields"
                });
            }
            const acc = await Account.findOne({email:email});
            if (!acc) {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            if(bcrypt.compare(password, acc.password) == false)
            {
                return res.send({
                    error: "Your Account was not found! Email or Password were incorrect"
                });
            }
            await Account.deleteOne(acc);
            res.status(200).json({
                status: "ok"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "error"
            });
        }
    }

    static async getAllAccounts(req, res){
        try{
            const accounts=await Account.find();
            if(!accounts){
                return res.status(404).send('No Accounts Found');
            }
            return res.status(200).json({
                accounts
            });
        }catch(err){
            return res.status(500).json({
                message: err
            });
        }
    }

    static async get_accountinfo_id(req, res) {
        const id = req.params.id;
        try
        {
            const acc = await Account.findById(id);
            if(!acc)
            {
                return res.status(204).json({
                    status: "Nothing was found"
                });
            }
            if(acc.Accountype === 1)
            {
                const user = await Member.MemberInfo.findOne({
                    AccountID: acc._id
                });
                const {_id, username, email, Accountype } = acc;
                //console.log(user);
                res.status(200).json({
                    status: "ok",
                    AccountID: _id,
                    username,
                    email,
                    Accountype,
                    martial:user.Marital_Status,
                    gender:user.Gender,
                    FirstName:user.FirstName,
                    LastName:user.LastName,
                    DOB:user.DateOfBirth,
                    Profile_Picture: acc.Profile_Picture,
                    overallrating:user.OverAllRating,
                    Country_of_Origin:user.Country_of_Origin,
                    MiddleName:user.MiddleName,

                });
            }
            else if(acc.Accountype === 2)
            {
                const judge = await Judge.findOne({
                    AccountID: acc._id
                });
                const {_id, username, email, Accountype } = acc;
                //console.log(judge);
                res.status(200).json({
                    status: "ok",
                    AccountID: _id,
                    username,
                    DOB:judge.DateOfBirth,
                    martial:judge.Marital_Status,
                    gender:judge.Gender,
                    email,
                    Accountype,
                    TermStartDate:judge.TermStartDate,
                    TermEndDate:judge.TermEndDate,
                    Court:judge.Court,
                    Education:judge.Education,
                    MiddleName:judge.MiddleName,
                    FirstName:judge.FirstName,
                    LastName:judge.LastName,
                    Profile_Picture: acc.Profile_Picture,
                    overallrating:judge.OverAllRating,
                    Country_of_Origin:judge.Country_of_Origin,
                });
            }
            else if(acc.Accountype === 3)
            {
                const witness = await Witness.findOne({
                    AccountID: acc._id
                });
                const {_id, username, email, Accountype } = acc;
              //  console.log(witness);
                res.status(200).json({
                    status: "ok",
                    AccountID: _id,
                    DOB:witness.DateOfBirth,
                    MiddleName:witness.MiddleName,
                    username,
                    martial:witness.Marital_Status,
                    gender:witness.Gender,
                    email,
                    Accountype,
                    FirstName:witness.FirstName,
                    LastName:witness.LastName,
                    Profile_Picture: acc.Profile_Picture,
                    overallrating:witness.OverAllRating,
                    Country_of_Origin:witness.Country_of_Origin,

                });
            }
            // res.status(200).json({
            //     status: "ok",
            //     acc
            // });
        }catch(error)
        {
            console.log(error);
            res.status(500).json({
                status: "error"
            });
        }
    }
}