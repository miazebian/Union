const Account = require('../Models/AccountDetail');
const Witness = require('../Models/MWitnessDetails');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const joi = require('joi');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Upload = require('../Services/Upload-Middleware.js');
module.exports = class MaraigeWitnessService {
    static async createWitness(req, res) {
        const [FirstName, MiddleName, LastName, Gender, DateOfBirth, Country_of_Origin] = req.body;
        const AccountID = req.session.AccountID;
        const WitnessInfo = new Witness({
            FirstName,
            MiddleName,
            LastName,
            Gender,
            DateOfBirth,
            Country_of_Origin,
            AccountID
        });
        try {
            await Witness.create(WitnessInfo);
            await Witness.save();
            return res.status(201).send(WitnessInfo);
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getAllWitnesses(req, res) {
        try {
            const witnesses = await Witness.find();
            if (!witnesses) {
                return res.status(404).send('No Witnesses Found');
            }
            return res.status(200).json({
                witnesses
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getWitnessById(req, res) {
        var ID = req.params.id;
        try {
            const wit = Witness.find({
                AccountID: ID
            });
            if (!wit) {
                return res.status(404).send("No Witness Found");
            }
            return res.status(200).json({
                wit
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async updateWitness(req, res) {
        const id = req.params.id;
        var UploadFile = multer({
          storage: Upload.files.storage(id),
          fileFilter: Upload.files.allowedFile
        }).
        single('file');
      
        const filePromise = new Promise((resolve, reject) => {
          UploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              // A multer error occurred when uploading the file
              console.log(err);
              reject('Error uploading file');
            } else if (err) {
              // An unknown error occurred
              console.log(err);
              reject('Unknown error');
            } else {
              const file = req.file;
              if (file !== undefined) {
                fs.readFile(file.path, function (err, data) {
                  if (err) {
                    console.log(err);
                    reject('Error reading file');
                  } else {
                    const binaryData = data;
                    const base64Image = binaryData.toString('base64');
                    const imageUrl = `data:image/png;base64,${base64Image}`;
                    resolve(imageUrl);
                  }
                });
              } else {
                resolve(null);
              }
            }
          });
        });
      
        try {
          const wit = await Witness.findOne({AccountID:id});
          const acc = await Account.findOne({_id:id});
          if (!wit) {
            return res.status(204).json({
              message: "No Witness Found"
            })
          }
          if (req.body.FirstName !== undefined) {
            wit.FirstName = req.body.FirstName;
          }
          if (req.body.MiddleName !== undefined) {
            wit.MiddleName = req.body.MiddleName;
          }
          if (req.body.LastName !== undefined) {
            wit.LastName = req.body.LastName;
          }
          if (req.body.Gender !== undefined) {
            wit.Gender = req.body.Gender;
          }
          if (req.body.DateOfBirth !== undefined) {
            wit.DateOfBirth = req.body.DateOfBirth;
          }
          if (req.body.Country_of_Origin !== undefined) {
            wit.Country_of_Origin = req.body.Country_of_Origin;
          }
      
          const imageUrl = await filePromise;
          acc.Profile_Picture = imageUrl;
          wit.Profile_Picture = imageUrl
          await wit.save();
          await acc.save();
        return res.status(200).json({
                    FirstName: wit.FirstName,
                    MiddleName: wit.MiddleName,
                    LastName: wit.LastName,
                    Gender: wit.Gender,
                    DateOfBirth: wit.DateOfBirth,
                    Country_of_Origin: wit.Country_of_Origin,
                    Accountype: acc.Accountype,
                    AccountID: wit.AccountID,
                    Profile_Picture: wit.Profile_Picture

                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    message: err
                });
            }
        };
    static async deleteWitness(req, res) {
        try {
            const wit = Witness.findByIdAndDelete(req.params.id);
            if (!wit) {
                return res.status(404).send("No Witness Found");
            }
            return res.status(200).json({
                wit
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
    static async getWitnessByName(req, res) {
        var Name = req.params.name;
        try {
            const wit = Witness.find({
                FirstName: Name
            });
            if (!wit) {
                return res.status(404).send("No Witness Found");
            }
            return res.status(200).json({
                wit
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }
}