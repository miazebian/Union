const Judge = require('../Models/JudgeDetails');
const Upload = require('../Services/Upload-Middleware.js');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const joi = require('joi');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = class JudgeService {
    static async createJudge(req, res) {
        const {
            FirstName,
            MiddleName,
            LastName,
            DateOfBirth,
            Gender,
            Country_of_Origin,
            Court,
            Education,
            TermStartDate,
            TermEndDate
        } = req.body;
        const {
            error
        } = joi.validate(req.body, {
            FirstName: joi.string().required(),
            MiddleName: joi.string(),
            LastName: joi.string().required(),
            DateOfBirth: joi.date().required(),
            Gender: joi.string().regex('^(Male|Female|Non-binary)$').required(),
            Court: joi.string().required(),
            Education: joi.string().required(),
            TermStartDate: joi.date().required(),
            TermEndDate: joi.date().required()
        });
        if (error) {
            return res.status(400).json({error});
        }
        const judge = new Judge({
            FirstName,
            MiddleName,
            LastName,
            DateOfBirth,
            Gender,
            Court,
            Education,
            TermStartDate,
            TermEndDate
        });
        try {
            await Judge.create(judge);
            await Judge.save();
            return res.status(201).json({judge});
        } catch (error) {
            res.status(500).json({error});
        }
    };
    static async getAllJudges(req, res) {
        try {
            const judges = await Judge.find();
            if (!judges) {
                return res.status(204).send('No Judges Found');
            }
            return res.status(200).send(judges);

        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    };
    static async getJudgeById(req, res) {
        try {
            const judge = await Judge.findById(req.params.id);
            if (!judge) {
                res.status(204).json({message:'No Judge Found'});
            }
            res.status(200).json({Judges: judge});
        } catch (error) {
            res.status(500).json({error});
        }
    };
    static async updateJudge(req, res) {
        //find and update a judge info
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
            const judge = await Judge.findById(req.params.id);
            if (!judge) {
                res.status(404).json({
                    message: 'No Judge Found'
                })
            }
            [FirstName, MiddleName, LastName, DateOfBirth, Gender, Court, Education, TermStartDate, TermEndDate] = req.body;
            const profile = req.file;
            if (error) {
                return res.status(400).json({error});
            }
            if(FirstName !== undefined)
            {
                judge.FirstName = FirstName;
            }
            if(MiddleName !== undefined)
            {
                judge.MiddleName = MiddleName;
            }
            if(LastName !== undefined)
            {
                judge.LastName = LastName;
            }
            if(DateOfBirth !== undefined)
            {
                judge.DateOfBirth = DateOfBirth;
            }
            if(Gender !== undefined)
            {
                judge.Gender = Gender;
            }
            if(Court !== undefined)
            {
                judge.Court = Court;
            }
            if(Education !== undefined)
            {
                judge.Education = Education;
            }
            if(TermStartDate !== undefined)
            {
                judge.TermStartDate = TermStartDate;
            }
            if(TermEndDate !== undefined)
            {
                judge.TermEndDate = TermEndDate;
            }
            if(profile !== undefined)
            {
                var imageUrl;
                    fs.readFile(file.path, function(err, data) {
                        if (err) throw err;
                        
                        // Access the binary data as a buffer
                        const binaryData = data;
                        const base64Image = binaryData.toString('base64');
                        imageUrl = `data:image/png;base64,${base64Image}`;
                    });
                judge.Profile_Picture = imageUrl;
            }            
            await judge.save();
            return res.status(200).json({judge});
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error.message);
        }
    });
}
    static async deleteJudge(req, res) {
        try {
            const judge = await Judge.findById(req.params.id);
            if (!judge) {
                return res.status(404).send('No Judge Found');
            }
            await Judge.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status:200,
                Message:"Judge Deleted Successfully"
            });
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error.message);
        }
    }
    static async getJudgeByName(req, res) {
        try {
            const judge = await Judge.find({
                FirstName: req.params.name
            });
            if (!judge) {
                return res.status(404).json({
                    message: 'No Judge Found'
                });
            }
            return res.json({
                status:200,
                judge
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async getJudgeByCourt(req, res) {
        try {
            const judge = await Judge.find({
                Court: req.params.Court
            });
            if (!judge) {
                return res.json({
                    status:204,
                    message: 'No Judge Found'
                });
            }
            return res.json({
                status:200,
                judge
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async getJudgeByEducation(req, res) {
        try {
            const judge = await Judge.find({
                Education: req.params.Education
            });
            if (!judge) {
                return res.json({
                    status:204,
                    message: 'No Judge Found'
                });
            }
            return res.json({
                status:200,
                judge
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async getJudgeByCountry(req, res) {
        try {
            const judge = await Judge.find({
                Country: req.params.Country
            });
            if (!judge) {
                return res.json({
                    status:204,
                    message: 'No Judge Found'
                });
            }
            return res.json({
                status:200,
                judge
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async getRatingbyID(req, res) {
        try {
            const AccountID = req.params.id;
            const judge = await Judge.findOne({
                AccountID:AccountID
            });
            if (!judge) {
                return res.status(404).json({
                    message: 'No Judge Found'
                });
            }
            const reviews = judge.Reviews;
            const OverAllRating = judge.OverAllRating;
            if(OverAllRating === undefined)
            {
                return res.json({
                    status:200,
                    reviews,
                    OverAllRating:"Not Rated"
                });
            }
            return res.json({
                status:200,
                reviews,
                OverAllRating
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};