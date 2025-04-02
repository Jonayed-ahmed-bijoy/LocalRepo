import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function S()
{

  const [sname, setsname] = useState()
  const [time, settime] = useState()
  const [etime, setetime] = useState(0)
  const [numstudent, setnumstudent] = useState()
  const [SID, setSID] = useState()
  const go = useNavigate()
  

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("http://localhost:3001/login", { sname, SID,time,etime,numstudent })
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
      <label>Student Name
        <input type="text" placeholder="Student Name" name = "sname"  onChange={(e) => setsname(e.target.value)} required/>
      </label>
      <label>Library ID
      <input type="text" inputmode="numeric" pattern="\d*" name ="SID" onChange={(e) => setSID(e.target.value)}  required/>
      </label>
      <label>Start Time
       <input type="time" name="librarytime" min="09:00" max="19:00" step='1800' onChange={(e) => settime(e.target.value)}  required/>
      </label>
      <input type="radio" name="time" value="1" onChange={(e) => setetime(e.target.value)} />
      <label for="etime1"> 1 Hour </label>
      <input type="radio" name="time" value="2"  onChange={(e) => setetime(e.target.value)}/>
      <label for="etime2"> 2 Hours </label>
      <label>Number Of Students
      <input type="text" inputmode="numeric" pattern="\d*" name = "numofstudent" onChange={(e) => setnumstudent(e.target.value)}  required/>
      </label>
      <input type="submit" value ="Apply"/>
    </form>
    );
}

export default S;