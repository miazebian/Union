const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
   ChatUsers:{
    type:Array,
    require:true,
   },
   message:{
    type:String,
    require: true,
   },
   Sender:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
   },
   Name:{
      type:String,
   },
   id:{
      type:mongoose.Schema.Types.ObjectId,
   },
   attachment:{
      type:String, // store the path of the uploaded file
   }

}, {timestamps:true});

module.exports = mongoose.model('Message', MessageSchema);