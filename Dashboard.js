import React from "react";
import Sidebar from "./Sidebar";
import Dashcom from "./Dashcom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar />
      <Dashcom />
    </div>
  );
};

export default Dashboard;