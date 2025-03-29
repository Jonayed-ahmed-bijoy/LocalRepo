import Express from 'express';
import dev from 'dotenv';
import route from './Routes/Enter.js'
import { cc } from '../Database/connect.js';
import User from '../Database/Models/Signup.js';
import mongoose from 'mongoose';
import cors from 'cors';

dev.config();
const server = Express();

server.use(Express.json());
server.use(cors());


server.use('/api', route);



server.get('/api/signup',async (req,res)=>
    {
        try
        {
            const x = await User.find({});
            res.status(200).json(
                {
                    success : true,
                    sign : x
                }
            );
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

server.post('/api/signup',async (req,res)=>
    {
        const data = req.body;
        if(!data.email || !data.password)
        {
            return res.status(400).json(
                {
                    success : false,
                    message : 'input all values'
                }
            );
        }
        const user = new User(data);

        try
        {
            await user.save();
            res.status(201).json(
                {
                    success : true,
                    sign : user
                }
            );
        }
        catch(err)
        {
            console.error('Problem in Signup');
            res.status(500).json(
                {
                    success : false,
                    message : 'Server Error'
                }
            );
        }
    });

server.put('/api/signup/:id',async (req,res)=>
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

server.delete('/api/signup/:id',async (req,res)=>
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


server.listen(5001,()=>
{
    cc();
    console.log(`Running on Port : 5000 z6zh`);
});