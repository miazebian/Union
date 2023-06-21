const Member = require('../Models/MemberDetails');
const Judge = require('../Models/JudgeDetails');
const Witness = require('../Models/MWitnessDetails');
const express = require('express');

module.exports = class Search {
    static async SearchForPayment(req, res)
    {
        const {First, Last, Accountype, Country} = req.params;
        

        try
        {
            if(Accountype == 2)
            {
                const judge = await Judge.find({FirstName:First, LastName:Last, Country_of_Origin:Country});
                if(!judge)
                {
                    return res.status(404).json({message:"No Results Found"});
                }
                return res.status(200).json({
                   judge
                });
            }
            if(Accountype == 3)
            {
                const witness = await Witness.find({FirstName:First, LastName:Last});
                if(!witness)
                {
                    return res.status(404).json({message:"No Results Found"});
                }
                return res.status(200).json({witness});
            }

            

        }catch(error)
        {
            console.log(error);
            res.status(500).json({error});
        }
    }
    static async SearchBar(req, res) {
        const keyword = req.params.keyword;
        try {
          const [member, judge, witness] = await Promise.all([
            Member.MemberInfo.find({
              $or: [{ FirstName: keyword }, { MiddleName: keyword }, { LastName: keyword }, { Country_of_Origin: keyword }]
            }),
            Judge.find({
              $or: [{ FirstName: keyword }, { MiddleName: keyword }, { LastName: keyword }, { Country_of_Origin: keyword }, { Court: keyword }, { Education: keyword }]
            }),
            Witness.find({
              $or: [{ FirstName: keyword }, { MiddleName: keyword }, { LastName: keyword }, { Country_of_Origin: keyword }]
            })
          ]);
      
          if (member.length === 0 && judge.length === 0 && witness.length === 0) {
            return res.status(200).json({
              message: "No content was found"
            });
          }
      
          return res.status(200).json({
            member,
            judge,
            witness
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
      }
}
