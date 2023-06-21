const express = require('express');
const session = require('express-session');
const router = express.Router();

const JudgeService = require('../Services/JudgeService');

router.post('/createJudge', JudgeService.createJudge);
router.get('/getAllJudges', JudgeService.getAllJudges);
router.get('/getJudge/:id', JudgeService.getJudgeById);
router.put('/updateJudge/:id', JudgeService.updateJudge);
router.delete('/deleteJudge/:id', JudgeService.deleteJudge);
router.get("/getJudgeName", JudgeService.getJudgeByName);
router.get("/getjudgereviews/:id",JudgeService.getRatingbyID)

module.exports = router;