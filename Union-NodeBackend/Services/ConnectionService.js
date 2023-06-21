const Connection = require('../Models/Connections');
const Account = require('../Models/AccountDetail');
const Group = require('../Models/Group');

module.exports = class ConnectionService {
    static async Create_Connection(req, res) {
        const Sender = req.params.send;
        const Receiver = req.params.recv;
        const connection = new Connection({
            Sender,
            Receiver,
            Status:0
        });
        try {
            const connections = await Connection.findOne({
                $or: [
                    { Sender: Sender, Receiver: Receiver },
                    { Sender: Receiver, Receiver: Sender }
                ]
            });
            if(connections !== null)
            {
                return res.status(200).json({message:"Connection Already Exists"});
            }
            await Connection.create(connection);
            return res.status(201).json({connection});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    }

    static async Create_Group_Connection(req, res) {
        const Sender = req.params.send;
        const Receiver = req.body.Receiver;
        const GroupName= req.body.Name;
        console.log(Sender, Receiver, GroupName);
        const group = new Group({
            Sender,
            Receiver,
            Status:3,
            Name:GroupName,
        });
        try {
            await Group.create(group);
            return res.status(201).json({group});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    }
    static async Get_Group(req, res) {
    try{
            const id=req.params.id;
            const findgroup = await Group.find({
                $or: [{ Sender: id }, { Receiver: { $in: [id] } }]
              });
            if (!findgroup) {
               return res.status(204).json({message:'No Connection Found'});
            }
           return res.status(200).json(findgroup);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
    static async Is_Connection_Acceped(req, res)
        {
            try{
                const Sender = req.params.send;
                const Receiver = req.params.recv;
                console.log(Sender, Receiver);
                const Conn = await Connection.findOne({
                    $or: [
                        { Sender: Sender, Receiver: Receiver, Status:1 },
                        { Sender: Receiver, Receiver: Sender, Status:1 }
                    ]
                });
                console.log(Conn);
                if(Conn === null)
                {
                    res.status(200).json({
                        message:"0"
                    })
                }else{
                res.status(200).json({
                    message:"1",
                    Sender:Sender,
                    Receiver:Receiver,
                    Status:Conn.Status
                })
            }
            }catch(err)
            {
                console.log(err);
                res.status(500).send("Internal Error");
            }
        }
        static async Is_Connected(req, res)
        {
            try{
                const Sender = req.params.send;
                const Receiver = req.params.recv;
                const Conn = await Connection.findOne({
                    $or: [
                        { Sender: Sender, Receiver: Receiver },
                        { Sender: Receiver, Receiver: Sender }
                    ]
                });
               // console.log(Conn)
                if(Conn === undefined)
                {
                    res.status(200).json({
                        message:"0"
                    })
                }else{
                res.status(200).json({
                    message:"1",
                    Sender:Conn.Sender,
                    Receiver:Conn.Receiver,
                    Status:Conn.Status
                })
            }
            }catch(err)
            {
                console.log(err);
                res.status(500).send("Internal Error");
            }
        }
    static async Get_Connections(req, res) {
        try {
            const connections = await Connection.find();
            if (!connections) {
                return res.status(204).send('No Connections Found');
            }
            return res.status(200).json(
                {
                    connections
                }
            );
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async Get_Connections_By_Sender(req, res) {
        try {
            const connection = await Connection.find({Sender: req.params.id});
            if (!connection) {
                res.status(204).json({message:'No Connection Found'});
            }
            res.status(200).json(connection);
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async Get_Connections_By_Receiver(req, res) {
        try {
            const connection = await Connection.find({Receiver: req.params.id});
            if (!connection) {
                return res.status(204).json({message:'No Connection Found'});
            }
           // console.log(connection);
            return res.status(200).json({Connections: connection});
            
        } catch (error) {
            return res.status(500).json({error});
        }
    }
    static async Get_Connection_ID(req, res)
    {
        try{
            const id1=req.params.id;
            const id2=req.params.id2;
            const connect = await Connection.findOne({
                $or: [
                    { Sender: id1, Receiver: id2 },
                    { Sender: id2, Receiver: id1 }
                ]
            });
            if(connect === undefined)
            {
                return res.status(204).json({message:'No Connection Found'});
            }
            return res.status(200).json({connect});
        } catch (error) {
            return res.status(500).json({error});
        }
    }
    static async Update_Connection_Status(req, res) {
        // console.log(req.params);
        try {
            const Sender = req.params.send;
            const Receiver = req.params.recv;
            const connection = await Connection.findOne({
                $or: [
                    { Sender: Sender, Receiver: Receiver },
                    { Sender: Receiver, Receiver: Sender }
                ]
            });
            
            console.log(connection);
            
            if (!connection) {
                return res.status(204).json({ message: 'No Connection Found' });
            }
            
            // const { Status } = req.body;
            connection.Status = 1;
            await connection.save();
            return res.status(200).json({ message: 'Connection Updated' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
    static async Delete_Connection_Sender(req, res) {
        try
        {
            const connection = await Connection.find({Sender: req.params.id});
            if (!connection) {
                res.status(204).json({message:'No Connection Found'});
            }
            await Connection.deleteOne({Sender: req.params.id});
            res.status(200).json({message: 'Connection Deleted'});
        }catch(err)
        {
            res.status(500).json({error});
        }
    }
    static async Delete_Connection_Receiver(req, res) {
        try
        {
            const connection = await Connection.find({Receiver: req.params.id});
            if (!connection) {
                res.status(204).json({message:'No Connection Found'});
            }
            await Connection.deleteOne({Receiver: req.params.id});
            res.status(200).json({message: 'Connection Deleted'});

        }catch(err)
        {
            res.status(500).json({error});
        }
    }
    static async Delete_Connection(req, res) {
        try {
            const send = req.params.send;
            const recv = req.params.recv;
            const connection = await Connection.findOne({
                $or: [
                    { Sender: send, Receiver: recv },
                    { Sender: recv, Receiver: send }
                ]
            });
            
            console.log(connection);
            
            if (!connection) {
                return res.status(204).json({ message: 'No Connection Found' });
            }
            
            await Connection.deleteOne({
                $or: [
                    { Sender: send, Receiver: recv },
                    { Sender: recv, Receiver: send }
                ]
            });
            
            return res.status(200).json({ message: 'Connection Deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

}