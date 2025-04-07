import Express from 'express';
import dev from 'dotenv';
import route from './Routes/Enter.js';
import bodyParser from 'body-parser';
import mongoSanitize from'express-mongo-sanitize';
import { cc } from '../Database/connect.js';
import User from '../Database/Models/Signup.js';
import mongoose from 'mongoose';
import cors from 'cors';


dev.config();
const server = Express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(Express.json());
server.use(cors());
server.use(mongoSanitize({allowDots: true}),);



server.use('/', route);

server.get('/alldata',async (req,res)=>
    {
        try
        {
            const x = await User.find({});
            res.status(200).json(x);
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    success : false,
                    message : 'Server Error'
                }
            );
        }
    });

server.put('/signup/:id',async (req,res)=>
        {
            const {id} = req.params;
            const x = req.body;
            if(!mongoose.Types.ObjectId.isValid(id))
            {
                res.status(404).json(
                    {
                        success : False,
                        message : "Invalid Input "
                    }
                );
            }
            try
            {
                const y =await User.findByIdAndUpdate(id,x,{new:true});

                res.status(200).json(
                    {
                        success : true,
                        data : y
                    }
                );
            }
            catch(err)
            {
                console.error('Problem in Delete');
                res.status(500).json(
                    {
                        success : false,
                        message : 'Server Error'
                    }
                );
            }
        });

server.delete('/signup/:id',async (req,res)=>
            {
                const {id} = req.params;
                if(!mongoose.Types.ObjectId.isValid(id))
                    {
                        res.status(404).json(
                            {
                                success : False,
                                message : "Invalid Input "
                            }
                        );
                    }
                try
                {
                    await User.findByIdAndDelete(id);
                    res.status(200).json(
                        {
                            success : true,
                            message : "Deleted"
                        }
                    );
                }
                catch(err)
                {
                    console.error('Problem in Delete');
                    res.status(500).json(
                        {
                            success : false,
                            message : 'Server Error'
                        }
                    );
                }
            });
    
console.log(process.env.Mdb);


server.listen(3001,()=>
{
    cc();
    console.log(`Running on Port : 3001 z6zh`);
});