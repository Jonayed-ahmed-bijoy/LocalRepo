import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>LIBRARY</h2>
      <ul>
        <li>Dashboard</li>
        <li>Add Books</li>
        <li>Remove Books</li>
        <li>Issue Books</li>
        <li>Rooms</li>
        <li>Upcoming Books</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;