const express = require('express');
const session = require('express-session');
const router = express.Router();

const Member = require('../Services/MemberService');

router.post('/createMember', Member.createMember);
router.get('/getAllMember', Member.getAllMembers);
router.get('/getMember/:id', Member.getMemberById);
router.put('/updateMember/:id', Member.updateMember);
router.delete('/deleteMember', Member.deleteMember);
router.get("/getMemberName", Member.getMemberByName);
module.exports = router;