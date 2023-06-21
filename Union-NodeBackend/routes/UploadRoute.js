const express = require('express');
const session = require('express-session');
const router = express.Router();

const Upload = require('../Services/UploadService');

router.post('/upload/:id', Upload.upload);
router.post('/uploadFiles/:id',Upload.uploadSeveral);
router.get('/getFiles/:id',Upload.getDocuments);
router.delete('/deleteFile/:id',Upload.deleteDocument);
module.exports = router;