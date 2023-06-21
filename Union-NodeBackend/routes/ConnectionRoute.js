const express = require('express');
const router = express.Router();

const Connection = require('../Services/ConnectionService');

router.post('/createConnection/:send/:recv', Connection.Create_Connection);
router.post('/createGroupConnection/:send', Connection.Create_Group_Connection);
router.get('/getAllConnections', Connection.Get_Connections);
router.get('/getConnectionBySender/:id', Connection.Get_Connections_By_Sender);
router.get('/getGroup/:id', Connection.Get_Group);
router.get('/is_Connected/:send/:recv',Connection.Is_Connected);
router.get('/getConnectionID/:id1/:id2',Connection.Get_Connection_ID);
router.get('/is_Connection_Accepted/:send/:recv',Connection.Is_Connection_Acceped);
router.get('/getConnectionByReceiver/:id', Connection.Get_Connections_By_Receiver);
router.put('/updateConnection/:send/:recv', Connection.Update_Connection_Status);
router.delete('/deleteConnection/:id', Connection.Delete_Connection_Sender);
router.delete('/deleteConnectionReceiver/:id', Connection.Delete_Connection_Receiver);
router.delete('/delete_double/:send/:recv', Connection.Delete_Connection);
module.exports = router;