const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const config = require('./config');
const auth = require('./routes/AccountRoute');
const MemberRoute = require('./routes/MemberRoute');
const MWitnessRoute = require('./routes/MWitnessRoute');
const JudgeRoute = require('./routes/JudgeRoute');
const UploadRoute = require('./routes/UploadRoute');
const MeetingRoute = require('./routes/MeetingRoute');
const Contact = require('./routes/ContactUsRoute');
const Connection = require('./routes/ConnectionRoute');
const Search = require('./routes/SearchRoute');
const Review = require('./routes/ReviewRoute');
const jwt = require('jsonwebtoken')

const oneDay = 1000 * 60 * 60 * 24;

const database = config.MONGO_URI;

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('mongo connected'))
.catch(err => console.log(err));

const verifyUserToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json(
        {
          status:401,
          message:"Access denied. No token provided."
        }
      );
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
  };

  const messageRoutes=require('./Services/MessagesService');


app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/members',verifyUserToken, MemberRoute);
app.use('/api/witnesses', verifyUserToken, MWitnessRoute);
app.use('/api/judges', verifyUserToken, JudgeRoute);
app.use('/api/Contact',verifyUserToken, Contact);
app.use('/api/Connection',verifyUserToken, Connection);
app.use('/api/Search',verifyUserToken, Search);
app.use('/api/Uploads',verifyUserToken, UploadRoute);
app.use('/api/Reviews',verifyUserToken, Review);
app.use('/api/Meetings',verifyUserToken, MeetingRoute);
app.use('/api/msg',messageRoutes);



const PORT = config.PORT || 5300;
module.exports = app;

app.listen(PORT, console.log("Server has started at port " + PORT));
