import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <header>
        <h1>Welcome to Dashboard</h1>
        <div className="icons">
          <span>📧</span>
          <span>👤</span>
        </div>
      </header>

      <section className="stats">
        <div className="stat-box">👤 Logged in users: <span>15</span></div>
        <div className="stat-box">📚 Total Books: <span>222</span></div>
        <div className="stat-box">📖 Borrowed Books: <span>50</span></div>
        <div className="stat-box">👥 Total Members: <span>1003</span></div>
      </section>

      <section className="chart">
        <h2>Book Trends</h2>
        <div className="chart-box">📊 (Graph Placeholder)</div>
      </section>

      <section className="new-members">
        <h2>New Members</h2>
        <div className="member-list">
          <div className="member">👤 ABCDEFGH - 12345678</div>
          <div className="member">👤 ABCDEFGH - 12345678</div>
          <div className="member">👤 ABCDEFGH - 12345678</div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;