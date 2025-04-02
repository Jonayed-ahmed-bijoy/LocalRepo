import express from 'express';
import js from 'jsonwebtoken';
import pass from 'bcryptjs';
import User from '../../Database/Models/Signup.js';
import Room from '../../Database/Models/Rooms.js';
import ApplyRoom from '../../Database/Models/ApplyRoom.js';
import Library from '../../Database/Models/LibraryCard.js';
import Sid from '../../Database/Models/StudentID.js';
import Books from '../../Database/Models/Books.js';
import BookHistory from '../../Database/Models/BookHistory.js';

const route = express();


route.get('/rooms',async (req,res)=>
    {

        try
        {
            let x = await Room.find({});
            res.status(200).json(x);
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
    });

route.get('/returndue',async (req,res)=>
    {
        const {SID}= req.body;
        try
        {
            let x = await BookHistory.findOne({SID});
            if(!x)
            {
                return(
                    res.status(400).json(
                    {
                        message : `No Book Borrowed`
                    }
                )
            );
            }
            let xy = await BookHistory.findOne({SID : SID ,bookstatus : 'borrowed'});
            if(!xy)
            {
                return res.status(400).json(
                    {
                        message : `All Books Returned`
                    }
                );
            }
            const xx = await BookHistory.find({SID : SID ,bookstatus : 'borrowed'}, {bookName: 1, bookid: 1,returndate: 1});
            res.status(200).json(xx);
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
    });

route.get('/recentlyreturned',async (req,res)=>
    {
        const {SID}= req.body;
        try
        {
            let x = await BookHistory.findOne({SID});
            if(!x)
            {
                return res.status(400).json(
                    {
                        message : `No BookHistory`
                    }
                );
            }
            let xy = await BookHistory.findOne({SID : SID ,bookstatus : 'returned'});
            if(!xy)
            {
                return res.status(400).json(
                    {
                        message : `No Book Returned`
                    }
                );
            }
            const xx = await BookHistory.find({SID : SID ,bookstatus : 'returned'},{bookName: 1, bookid: 1});
            res.status(200).json(xx);
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
    });

route.get('/books',async (req,res)=>
    {
        try
        {
            const x = await Books.find({});
            res.status(200).json(x);
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
    });

route.get('/booksearch', async(req,res)=>
    {
        const {bookName}= req.body;
    
        try
        {
            let x = await Books.findOne({bookName : bookName.toLowerCase()});
            if(!x)
            {
                return res.status(400).json(
                    {
                        message : `Book Didnt Found`
                    }
                );
            }
            let xx = await Books.find({bookName : bookName.toLowerCase()});
            res.json(`book found ${xx.bookName}`);
            res.status(200).json(xx);
        } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error OHHH YEAH');
        }
    });

route.post('/librarycard', async(req,res)=>
    {
        const {email,firstname,lastname,city,SID}= req.body;
    
        try
        {
            let ll = await Sid.findOne({SID});
            if(!ll)
            {
                return res.status(400).json(
                    {
                        message : `Your Student ID Didn't Match `
                    }
                );
            }
            let card = await Library.findOne({SID});
            if(card)
            {
                return res.status(400).json(
                    {
                        message : 'You Already Have Library Card'
                    }
                );
            }
            card = new Library({email,firstname,lastname,city,SID});
            await card.save();
            res.json(
                {
                    message : 'Library Card created'
                }
            );
        } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error OHHH YEAH');
        }
    });

route.post('/applyroom', async(req,res)=>
    {

        const {name,SID,start,end,roomnumber,numofs}= req.body;
    
        try
        {
            let library = await Library.findOne({SID});
            if(!library)
            {
                return res.status(400).json(
                    {
                        message : 'You Need Library Card First'
                    }
                );
            }
            let room = await Room.findOne({roomnumber});
            if(!room)
            {
                return res.status(400).json(
                    {
                        message : 'Room Not Found'
                    }
                );
            }
            if(room.avilable==="NO")
            {
                return res.status(400).json(
                    {
                        message : 'Room Not Avilable'
                    }
                );
            }
            let apply =  await ApplyRoom.findOne({SID});
            if(apply)
                {
                    return res.status(400).json(
                        {
                            message : 'Already You Booked A Room'
                        }
                    );
                }
            apply = new ApplyRoom({name,SID,start,end,roomnumber,numofs});
            await apply.save();
            res.json("Success")
        } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

route.post('/signup', async(req,res)=>
{
    const {email,password}= req.body;

    try
    {
        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json(
                {
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

route.post("/login", (req, res) => {
    const {email, password} = req.body;
    try
    {
        User.findOne({email : email})
        .then(user => {
        if(user) {
            pass.compare(password, user.password, function(err, results){
                if(err){
                    throw new Error(err)
                 }
                 if (results) {
                    return res.json("Success")
                } else {
                    return res.json("Invalid credencial")
                }
               })
        }
        else{
            res.json("No record existed")
        }
        })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
    });


export default route;