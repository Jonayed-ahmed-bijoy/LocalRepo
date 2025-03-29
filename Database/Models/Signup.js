import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email :
        {
             type : String,
             require : true,
             unique : true
        },
        password :
        {
             type : String,
             require : true
        }
    }
);

const User = mongoose.model('SignupData',schema);
export default User;