const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

module.exports.files={
    storage:function(id){
        const path = `./Uploads/${id}`;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      
      return storage;
},

allowedFile:function(req, file, cb) {
    
    if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only  files are allowed!';
        return cb(new Error('Only  files are allowed!'), false);
    }
    cb(null, true);
}


}