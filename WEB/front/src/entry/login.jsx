import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () =>
{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const go = useNavigate()

    const handleSubmit = (e) => 
      {
    e.preventDefault()
    axios.post("http://localhost:3001/login", { email, password })
    .then(result => 
    {
        console.log(result)
        if(result.data === "Success")
        {
          go("/studenthome")
        }
        else if(result.data === "Invalid credencial")
        {
          alert("Password Didn't Match") ;
        }
        else
        {
          alert("You are not registered to this service") ;
        }
    })
    .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmit}>
      <label>Email
        <input type="text" placeholder="Enter Your Email" name = "email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} required/>
      </label>
      <label>Password
        <input type="text" placeholder="Enter Your Password" name = "password" onChange={(e) => setPassword(e.target.value)} required/>
      </label>
      <p><input type="submit" value ="Log In"/></p>
      <p>Don't have an account?</p>
      <Link to="/signup">Sign Up</Link>
      </form>
    );
}

export default Login;