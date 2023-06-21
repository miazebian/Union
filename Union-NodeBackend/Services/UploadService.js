const multer = require('multer');
const session = require('express-session');
const path = require('path');
const config = require('../config');
const Upload = require('../Services/Upload-Middleware.js');
const Account = require('../Models/AccountDetail');
const Judge = require('../Models/JudgeDetails');
const { MemberInfo } = require('../Models/MemberDetails');
const Witness = require('../Models/MWitnessDetails');
const fs = require('fs');
const { Documents } = require('../Models/MemberDetails');
const { google } = require('googleapis');
const { promisify } = require('util');
const stream = require('stream');


const KeyFile = path.join(__dirname + '\\credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KeyFile,
    scopes: SCOPES
});
  const getFolderByName = async (folderName) => {
    const drive = google.drive({version: 'v3', auth:auth});
    const query = "mimeType='application/vnd.google-apps.folder' and trashed=false and name='" + folderName + "'";
    const {data} = await drive.files.list({
      q: query,
      fields: 'files(id)',
      spaces: 'drive'
    });
  
    if (data.files.length === 0) {
      return -1;
    }

  
    return data.files[0].id;
  };
  const createFolder = async (folderName) => {
    const drive = google.drive({
      version: 'v3',
      auth: auth
    });
    const check = await getFolderByName(folderName);
    if(check !== -1)
    {
        return check;
    }
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: ['1XnFYZqFi1CAuNpuqnMgxrVzSjTGaenbC']
    };
  
    try {
      const { data } = await drive.files.create({
        resource: fileMetadata,
        fields: 'id'
      });
      console.log(`Folder has been created with Id: ${data.id}`);
      return data.id;
    } catch (error) {
      console.error(`Error occurred while creating the folder: ${error}`);
    }
  };
const uploadFileToDrive = async (file,folderId) => {
    const fileStream = fs.createReadStream(file.path);
    const {data} = await google.drive({
        version: 'v3',
        auth:auth
    }).files.create({
        media:{
            mimeType: file.mimetype,
            body: fileStream
        },
        requestBody:{
            name: file.originalname,
            parents: [folderId]
        },
        fields: 'id,name'
    });
   return data.id;
}
const GetFiles = async (folderId) => {
    const drive = google.drive({
        version: 'v3',
        auth:auth
    });
    if(folderId === undefined || folderId === null|| folderId === -1)
    {
        return [];
    }
    const {data} = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id,name)',
        spaces: 'drive'
    });
    return data.files;
};
const SetFilePublic = async (fileId) => {
    const drive = google.drive({
        version: 'v3',
        auth:auth
    });
    await drive.permissions.create({
        fileId: fileId,
        requestBody:{
            role: 'reader',
            type: 'anyone'
        }
    });
}
module.exports = {
    upload: function (req, res) {
        var UploadFile = multer({ 
            storage: Upload.files.storage(), 
            fileFilter: Upload.files.allowedFile }).
            single('file');
        UploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            }
            else {
                var imageUrl;
                const file = req.file;
                const id = req.params.id;
                const user = await Account.findOne({_id: id});
                const member = await MemberInfo.findOne({AccountID: id});
                const judge = await Judge.findOne({AccountID: id});
                const witness = await Witness.findOne({AccountID: id});
                if(user === undefined || user === null)
                {
                    return res.status(400).json({ message: 'User not found' });
                }
                if(file === undefined)
                {
                    return res.status(400).json({ message: 'File not found' });
                }
                fs.readFile(file.path, function(err, data) {
                    if (err) throw err;
                    
                    // Access the binary data as a buffer
                    const binaryData = data;
                    const base64Image = binaryData.toString('base64');
                    imageUrl = `data:image/png;base64,${base64Image}`;
                    if(member !== undefined && member !== null)
                    {
                        member.Profile_Picture = imageUrl;
                        member.save();
                    }else if(judge !== undefined && judge !== null)
                    {
                        judge.Profile_Picture = imageUrl;
                        judge.save();
                    }
                    else if(witness !== undefined && witness !== null)
                    {
                        witness.Profile_Picture = imageUrl;
                        witness.save();
                    }
                    user.Profile_Picture = imageUrl;
                    user.save();
                    return res.status(200).json({ message: 'File uploaded successfully',Profile_Picture: imageUrl });
                   
                });
            }
        })   
    },
    uploadSeveral: async function (req, res) {
        const id = req.params.id;
        var UploadFile = multer({ 
            storage: Upload.files.storage(id), 
            fileFilter: Upload.files.allowedFile }).
            array('files',10);
        UploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            }
            else {
                try{
                const folderId = await createFolder(id)
                const files = req.files;
                console.log(files[0].path);
                for(let f = 0; f<files.length; f++)
                {
                    const fileID = await uploadFileToDrive(files[f],folderId);
                    const document = new Documents({
                        AccountID: id,
                        DocumentName: files[f].originalname,    
                        DocumentURL: `${fileID}`,
                        DocumentPath: files[f].path,
                        DocumentSize: files[f].size,
                        DocumentType: files[f].mimetype,
                        DocumentDate: Date.now(),
                        ParentUrl: `${folderId}`
                    });
                }
                console.log(`https://drive.google.com/drive/folders/${folderId}`);
                return res.status(200).json({ message: 'Files uploaded successfully' });
                }catch(err)
                {
                    console.log(err);
                    return res.status(400).json({ message: err.message });
                }
            }
        });
    },
    getDocuments: async function (req, res) {
        const id = req.params.id;
        const drive = google.drive({
            version: 'v3',
            auth:auth
        });
    
        try {
            // Retrieve the folder ID for the specified folder name
            const folder = await getFolderByName(id);
            if(folder === undefined || folder === null)
            {
                return res.status(204).json({ message: 'Folder not found' });
            }
    
            // Retrieve the list of files in the specified folder
            const files = await GetFiles(folder);
            if(files.length === 0)
            {
                return res.status(204).json({ message: 'No documents found' });
            }
            var docs = [];
            var PreviewLinks = [];
            for(let f = 0; f<files.length; f++)
            {
                SetFilePublic(files[f].id);
                const file = await drive.files.get({
                    fileId: files[f].id,
                    fields:'webViewLink'

                });
                var str = file.data.webViewLink;
                var PreviewLink = str.substring(0, str.length - 17);
                PreviewLink = PreviewLink+'preview';
                PreviewLinks.push(PreviewLink);
                docs.push(file.data.webViewLink);
            }
            // Return the list of files
            return res.status(200).json({ message: 'Documents found', documents: files, docs, PreviewLinks });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: 'Error retrieving documents' });
        }
    },
    deleteDocument: async function (req, res) {
    const URL = req.body.url;
    const id = req.params.id;
    const Document = await Documents.findOne({AccountID: id,DocumentURL: URL});
    if(Documents === undefined || Documents === null)
    {
        return res.status(400).json({ message: 'Documents not found' });
    }
    fs.unlink(Documents.DocumentPath, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })
    Document.remove();
    return res.status(200).json({ message: 'Documents deleted successfully' });
    }
}