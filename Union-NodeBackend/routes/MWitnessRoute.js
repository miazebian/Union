const express = require('express');
const session = require('express-session');
const router = express.Router();

const MWitnessService = require('../Services/MWitnessService');

router.post('/createWitness', MWitnessService.createWitness);
router.get('/getAllWitness', MWitnessService.getAllWitnesses);
router.get('/getWitness/:id', MWitnessService.getWitnessById);
router.put('/updateWitness/:id', MWitnessService.updateWitness);
router.delete('/deleteWitness/:id', MWitnessService.deleteWitness);
router.get("/getWitnessName", MWitnessService.getWitnessByName);
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "mysecretkeythatiwanttouseformynwefhiohow4rjo4joiwjfojfiw4",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));
module.exports = router;