import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function S()
{

  const [email, setEmail] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [cityname, setCity] = useState()
  const [phonenum, setPhone] = useState()
  const [SID, setSID] = useState()
  const go = useNavigate()
  
      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("http://localhost:3001/login", { email, firstname,lastname,cityname,phonenum,SID })
          .then(result => {
              console.log(result)
              if(result.data === "Success")
              {
                  go("/studentaccount")
              }
              else
              {
                  alert("Student id not found")
              }
          })
          .catch(err => console.log(err))
      }
  


    return(
        <form onSubmit={handleSubmit}>
      <label>Email
        <input type="text" placeholder="Enter Your Email" name = "email"  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} required/>
      </label>
      <label>First Name
        <input type="text" placeholder="" name = "fname" onChange={(e) => setFirstname(e.target.value)}  required/>
      </label>
      <label>Last Name
        <input type="text" placeholder="" name = "lname" onChange={(e) => setLastname(e.target.value)}  required/>
      </label>
      <label>City
        <input type="text" placeholder="" name = "city" onChange={(e) => setCity(e.target.value)}  required/>
      </label>
      <label>Phone Number
        <input type="tel" placeholder="" name = "phone"  pattern="[0-9]{11}" onChange={(e) => setPhone(e.target.value)} required/>
      </label>
      <label>Student ID
      <input type="text" inputmode="numeric" pattern="\d*" name = "SID" onChange={(e) => setSID(e.target.value)} required/>
      </label>
      <input type="submit" value ="Apply"/>
    </form>
    );
}

export default S;