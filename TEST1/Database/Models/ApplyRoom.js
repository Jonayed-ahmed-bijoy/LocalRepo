import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name :
        {
             type : String,
             required : true,
        },
        SID :
        {
             type : Number,
             required : true
        },
        start :
        {
             type : Number,
             required : true
        },
        end :
        {
             type : Number,
             required : true
        },
        roomnumber :
        {
          type : Number,
          required : true
        },
        numofs :
        {
             type : Number,
             required : true
        }
    }
);

const User = mongoose.model('ApplyRoom',schema);
export default User;