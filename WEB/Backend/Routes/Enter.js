import express from 'express';
//import js from 'jsonwebtoken';
import pass from 'bcryptjs';
import User from '../../Database/Models/Signup.js';
import Room from '../../Database/Models/Rooms.js';
import ApplyRoom from '../../Database/Models/ApplyRoom.js';
import Library from '../../Database/Models/LibraryCard.js';
import Sid from '../../Database/Models/StudentID.js';
import Books from '../../Database/Models/Books.js';
import BookHistory from '../../Database/Models/BookHistory.js';
import UpcomingBooks from '../../Database/Models/UpcomingBooks.js';

const route = express();


route.get('/totalmember',async (req,res)=>
    {
        try
        {
            const x =await User.countDocuments();
            res.json(x);
        }
        catch(err)
        {
            console.error(err);
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.get('/borrowbook',async (req,res)=>
    {
        try
        {
            const x =await Books.countDocuments({state : 'Not Avilable'});
            res.json(x);
        }
        catch(err)
        {
            console.error(err);
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.get('/totalbook',async (req,res)=>
    {
        try
        {
            const x =await Books.countDocuments();
            res.json(x);
        }
        catch(err)
        {
            console.error(err);
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.post('/returnbook',async (req,res)=>
    {
        const {bookid,SID,issudate} = req.body;
        try
        {
            let us = await BookHistory.findOne({SID,bookid,issudate,bookstatus: "borrowed"});
            if(!us)
                {
                    return res.status(400).json(
                    {
                        message : 'Book Not Found'
                    }
                 );
                }
            const bookstatus = 'returned';
            const state ='avilable';
            await BookHistory.updateOne({SID,bookid,issudate},
                {
                    $set :
                    {
                        bookstatus : bookstatus
                    }
                }
            );
            await Books.updateOne({bookid},
                {
                    $set :
                    {
                        state : state,
                        SID : "",
                        issudate : "",
                        returndate : ""
                    }
                }
            );
            res.json("YESS");
        }
        catch(err)
        {
            console.error(err);
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.post('/issuebook',async (req,res)=>
    {
        const {bookid,SID,issudate,returndate} = req.body;
        try
        {
            let us = await Books.findOne({bookid});
            if(!us)
                {
                    return res.status(400).json(
                    {
                        message : 'Bookid Not Found'
                    }
                 );
                }
            let uss = await Library.findOne({SID});
            if(!uss)
                {
                    return res.status(400).json(
                    {
                        message : 'Dont Have Library Card'
                    }
                    );
                }
            let yy = await Books.findOne({bookid : bookid,state : "avilable"});
            if(!yy)
                {
                    return res.status(400).json(
                    {
                        message : 'Book Not Avilable'
                    }
                     );
                }
            const bookName = us.bookName;
            const bookstatus = 'borrowed';
            const state ='Not Avilable';
            const x = new BookHistory({SID,bookName,bookid,bookstatus,issudate,returndate});
            await x.save();
            await Books.updateOne({bookid},
                {
                    $set :
                    {
                        state : state,
                        SID : SID,
                        issudate : issudate,
                        returndate : returndate
                    }
                }
            );
            res.json("YESS");
        }
        catch(err)
        {
            console.error('Problem in Delete');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.post('/upcomingbook',async (req,res)=>
    {
        
        const {bookNam,author,edition,bookid,arrivaldate} = req.body;
        try
        {
            const bookName = bookNam.toLowerCase();
            let us = await UpcomingBooks.findOne({bookid});
            if(us)
                {
                    return res.status(400).json(
                    {
                        message : 'Book Already In Upcoming List'
                    }
                 );
                }
                let yy = await Books.findOne({bookid});
                if(yy)
                    {
                        return res.status(400).json(
                        {
                            message : 'Book Already In Library'
                        }
                     );
                    }
            const x = new UpcomingBooks({bookName,author,edition,bookid,arrivaldate});
            await x.save();
            res.json("YESS");
        }
        catch(err)
        {
            console.error('Problem in Delete');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
});

route.delete('/removebook',async (req,res)=>
            {
                const {bookNam,bookid} = req.body;
                try
                {
                    const bookName = bookNam.toLowerCase();
                    let user = await Books.findOne({bookName,bookid});
                    if(!user)
                        {
                            return res.status(400).json(
                            {
                                message : 'Book Didnt Found'
                            }
                         );
                        }
                    await Books.deleteOne({bookName,bookid});
                    res.status(200).json(
                        {
                            message : "Deleted"
                        }
                    );
                }
                catch(err)
                {
                    console.error('Problem in Delete');
                    res.status(500).json(
                        {
                            message : 'Server Error'
                        }
                    );
                }
        });

route.post('/addbook', async(req,res)=>
    {
        const {bookNam,author,edition,shelf,bookid} = req.body;
        try
        {
            let user = await Books.findOne({bookid});
            if(user)
            {
                return res.status(400).json(
                    {
                        message : 'Book Already Exist'
                    }
                );
            }
            const state = 'avilable';
            const bookName = bookNam.toLowerCase();
            user = new Books({bookName,author,edition,shelf,bookid,state});
            await user.save();
            res.json("YESS");
        } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
        });

route.get('/bookhistory',async (req,res)=>
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
            const xx = await BookHistory.find({SID});
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
            pass.compare(password,user.password,function(err, results){
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