const express = require('express');
const session = require('express-session');
const router = express.Router();

const AccountService = require('../Services/AccountService');

router.post('/register', AccountService.Register);
router.post('/login', AccountService.Login);
router.post('/logout', AccountService.Logout);
router.put('/updatePassword', AccountService.UpdatePassWord);
router.put('/updateEmail', AccountService.UpdateEmail);
router.put('/updateUsername', AccountService.UpdateUsername);
router.delete('/deleteAccount', AccountService.DeleteAccount);
router.get('/getAccount/:id', AccountService.get_accountinfo_id);
router.get('/getAllAccount', AccountService.getAllAccounts);

const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "mysecretkeythatiwanttouseformynwefhiohow4rjo4joiwjfojfiw4",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));
module.exports = router; 