import React, { useState } from "react";
import "./lform.css";

const Ff = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    studentId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Library Card</h2>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="studentId" placeholder="Student ID" onChange={handleChange} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Ff;