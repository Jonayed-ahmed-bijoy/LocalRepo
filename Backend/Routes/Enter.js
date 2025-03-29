import express from 'express';

//import route from 'express'.Router();
import js from 'jsonwebtoken';
import pass from 'bcryptjs';
import User from '../../Database/Models/Signup.js';

const route = express();
route.post('/register', async(req,res)=>
{
    const {email,password}= req.body;

    /*if(!email.email || !password.password)
        {
            return res.status(400).json(
                {
                    success : false,
                    message : 'input all values'
                }
            );
        }*/
    try
    {
        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json(
                {
                    success : false,
                    message : 'User Already Exist'
                }
            );
        }
        
        user = new User({email, password});
        const addhashsalt = await pass.genSalt(10);
        user.password=await pass.hash(password,addhashsalt);

        await user.save();

        const payload = {
            user: { id: user.id }
        };

        js.sign(payload, process.env.JWT, { expiresIn: 360 }, 
        (err, token) => 
            {
            if (err) throw err;
            res.json({ token });
            }
       );
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default route;