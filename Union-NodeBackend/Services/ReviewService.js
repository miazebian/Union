const Judge = require('../Models/JudgeDetails');
const Witness = require('../Models/MWitnessDetails');
const MemberDet = require('../Models/MemberDetails');
const mongoose = require('mongoose');
const Member = MemberDet.MemberInfo;

module.exports = class ReviewService {
    static async AddReview(req, res) {
        const { reviewer, reviewee } = req.params;
        console.log(reviewer);
        console.log(reviewee);
        const { review, rating } = req.body;

      
        try {
          let entity = await Member.findOne({ AccountID: reviewee });
          console.log(entity);
      
          if (!entity) {
            entity = await Judge.findOne({ AccountID: reviewee });
            console.log(entity);
            if (!entity) {
              entity = await Witness.findOne({ AccountID: reviewee });
              console.log(entity);
              if (!entity) {
                res.status(404).json({ error: "Reviewee not found" });
                return;
              }
            }
          }
          console.log(entity);
          const comment = review;
          entity.Reviews.push({ rating, comment, reviewer });
          const totalRatings = entity.Reviews.length;
           let sum = 0;
           for(let i = 0; i < totalRatings; i++)
           {
                sum += entity.Reviews[i].rating;
           }
           const newRating = sum / totalRatings;
           entity.OverAllRating = newRating.toFixed(2);  
          await entity.save();
      
          res.status(201).json({ entity });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
      }
    static async getReview(req, res) {
        const {reviewee} = req.params;
        try{
            let user = await Member.findOne({ AccountID: reviewee });
      
          if (!user) {
            user = await Judge.findOne({ AccountID: reviewee });
      
            if (!user) {
              user = await Witness.findOne({ AccountID: reviewee });
      
              if (!user) {
                res.status(404).json({ error: "Reviewee not found" });
                return;
              }
            }
        }
        return res.status(200).json({
            Reviews: user.Reviews,
            overallRating: user.OverAllRating
        });
        }catch(error)
        {
          console.log(error);
          res.status(500).json({ error });
        }
    }
    static async RemoveReview(req, res)
    {
        const {reviewer, reviewee , reviewID} = req.params;
        try{
            let entity = await Member.findOne({ AccountID: reviewee });
      
          if (!entity) {
            entity = await Judge.findOne({ AccountID: reviewee });
      
            if (!entity) {
              entity = await Witness.findOne({ AccountID: reviewee });
      
              if (!entity) {
                res.status(404).json({ error: "Reviewer not found" });
                return;
              }
            }
          }
            const review = entity.Reviews.find(review => review.reviewer == reviewer && review._id == reviewID);
            if(!review)
            {
                return res.status(204).json({
                    message: "No review found"
                })
            }
            const index = entity.Reviews.indexOf(review);
            entity.Reviews.splice(index, 1);
            const totalRatings = entity.Reviews.length;
            let sum = 0;
            for(let i = 0; i < totalRatings; i++)
            {
                 sum += entity.Reviews[i].rating;
            }
            const newRating = sum / totalRatings;
            entity.OverAllRating = newRating.toFixed(2);
            await entity.save();
            return res.status(200).json({
                message: "Review removed successfully",
                Reviews: entity.Reviews,
                overallRating: entity.OverAllRating
            });
        }catch(error)
        {
            console.log(error);
            return res.status(500).json({error});
        }

    }
}