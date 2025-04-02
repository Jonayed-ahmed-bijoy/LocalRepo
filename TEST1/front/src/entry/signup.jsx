import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";




function Signup()
{
   const [email, setemail] = useState()
   const [password, setpassword] = useState()
   const [cpassword, setCpassword] = useState()
   const go = useNavigate()
  

      const handleSubmit = (e) => 
      {
        e.preventDefault()
        if(password!==cpassword)
          {alert("Password Didnt Match")
          return;
        }
        axios.post("http://localhost:3001/signup", {email, password })
        .then(result => {console.log(result)
          alert("Registration Succesful Please Log In")
          go("/login")
        })
        .catch(err => console.log(err))
    }

 

    return(
        <form onSubmit={handleSubmit}>
      <label>Email
        <input type="text" placeholder="Enter Your Email" name = "eemail"  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"  onChange={(e) => setemail(e.target.value)} required/>
      </label>
      <label>Password
        <input type="password" placeholder="Enter Your Password" id = "a" name = "password" onChange={(e) => setpassword(e.target.value)}  required/>
      </label>
      <label>Confirm Password
        <input type="password" placeholder="Enter Your Password"  id = "b" name = "Cpassword" onChange={(e) => setCpassword(e.target.value)} required/>
      </label>
      <p id ="show"/>
      <button type="submit">Sumbit</button>
      <Link to="/login">Log In</Link>
      </form>
    );


}

export default Signup;