import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        bookName:
        {
            type : String,
            required : true
        },
        author :
        {
             type : String,
             required : true,
        },
        edition :
        {
             type : Number,
             required : true,
        },
        bookid :
        {
             type : Number,
             required : true
        },
        arrivaldate:
        {
          type : Date,
          required : true
        }
    }
);

const User = mongoose.model('UpcomingBooks',schema);
export default User;