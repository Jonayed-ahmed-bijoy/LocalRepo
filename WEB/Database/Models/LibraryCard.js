import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email:
        {
            type : String,
            required : true
        },
        firstname :
        {
             type : String,
             required : true,
        },
        lastname :
        {
             type : String,
             required : true,
        },
        city :
        {
             type : String,
             required : true,
        },
        SID :
        {
             type : Number,
             required : true
        }
    }
);

const User = mongoose.model('LibraryCard',schema);
export default User;