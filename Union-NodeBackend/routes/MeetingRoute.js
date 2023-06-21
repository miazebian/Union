const express = require('express');
const session = require('express-session');
const router = express.Router();

const Meeting = require('../Services/MeetingRoomService');

router.post('/createMeeting', Meeting.Create_Meeting);
router.get('/validateMeetingId', Meeting.Validate_Meeting_ID);
router.get('/meteredDomain', Meeting.Metered_Domain);

module.exports = router;
