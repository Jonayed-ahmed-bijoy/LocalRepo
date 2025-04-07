import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
    {
        roomnumber :
        {
             type : Number,
             required : true,
        },
        avilable :
        {
             type : String,
             required : true
        },
        sname :
        {
             type : String
        },
        SID :
        {
             type : Number
        },
        time:
        {
          type : Number
        }
    }
);

const User = mongoose.model('Rooms',schema);
export default User;