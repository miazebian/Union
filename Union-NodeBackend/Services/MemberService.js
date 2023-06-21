const Account = require('../Models/AccountDetail');
const { MemberInfo } = require('../Models/MemberDetails');
const Judge = require('../Models/JudgeDetails');
const Witness = require('../Models/MWitnessDetails');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const joi = require('joi');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Upload = require('../Services/Upload-Middleware.js');
module.exports = class MemberService {
    static async createMember(req, res) {
        const [FirstName, MiddleName, LastName, DateOfBrith, Gender, Country_of_Origin, Marital_Status] = req.body;
        const AccountID = req.session.AccountID;
        const MemberInfo = new Member({
            FirstName,
            MiddleName,
            LastName,
            DateOfBrith,
            Gender,
            Country_of_Origin,
            Marital_Status,
            AccountID
        });
        try {

            await MemberInfo.create(MemberInfo);
            await MemberInfo.save();
            return res.status(201).send(MemberInfo);

        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getAllMembers(req, res) {
        try {
            const members = await MemberInfo.find();
            if (!members) {
                return res.status(404).send('No Members Found');
            }
            return res.status(200).json({
                message:'Members Found',
                members
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getMemberById(req, res) {
        try {
            const member = await MemberInfo.findById(req.params.id);
            if (!member) {
                return res.status(404).send('No Member Found');
            }
            return res.status(200).json({
                member
            });

        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async updateMember(req, res) {
        console.log(req.session);
        console.log("The request body:\n", req.body);
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }
        
        //const [FirstName, MiddleName, LastName, DateOfBirth, Gender, Country_of_Origin, Marital_Status] = req.body;
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
        try {
            const member = await MemberInfo.findOne({_id: req.params.id});
            console.log(member);
            if (!member) {
                return res.status(404).send('No Member Found');
            }
            if(req.body.FirstName !== undefined){
            member.FirstName = req.body.FirstName;
            }
            if(req.body.MiddleName !== undefined){
            member.MiddleName = req.body.MiddleName;
            }
            if(req.body.LastName !== undefined){
            member.LastName = req.body.LastName;
            }
            if(req.body.DateOfBirth){
            member.DateOfBirth = req.body.DateOfBirth;
            }
            if(req.body.Gender !== undefined)
            {
            member.Gender = req.body.Gender;
            }
            if(req.body.Country_of_Origin !== undefined){
            member.Country_of_Origin = req.body.Country_of_Origin;
            }
            if(req.body.Marital_Status !== undefined){
            member.Marital_Status = req.body.Marital_Status;
            }
            if(req.body.SocialSecurityNumber !== undefined){
            member.SocialSecurityNumber = req.body.SocialSecurityNumber;
            }
            if(req.file !== undefined)
            {
            const file = req.file;
            var imageUrl;
            fs.readFile(file.path, function(err, data) {
            if (err) throw err;
            const binaryData = data;
            const base64Image = binaryData.toString('base64');
            imageUrl = `data:image/png;base64,${base64Image}`;
            });
            member.Profile_Picture = imageUrl;
            }
            await member.save();
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    });
}
    static async deleteMember(req, res) {
        if(req.session == null)
        {
            return res.status(401).send('Unauthorized');
        }
        try {
            const member = await MemberInfo.findOne({_id:req.session.user._id});
            const account = await Account.findOne({_id:req.session.account._id});
            if (!account)
            {
                return res.status(401).json('Unauthorized');
            }
            if (!member) {
                return res.status(404).json('No Member Found');
            }
            await member.remove();
            await account.remove();
            req.session.destroy();
            return res.status(200).send('Member Deleted');
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getMemberByName(req, res) {
        try {
            const member = await MemberInfo.find({
                FirstName: req.body.FirstName
            });
            if (!member) {
                return res.status(404).send('No Member Found');
            }
            return res.status(200).send(member);
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
}