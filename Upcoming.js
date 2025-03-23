import React from "react";
import "./Upcoming.css"; // Import CSS for styling

const  Upcoming = () => {
  return (
    <div className="library-container">
      <header className="library-header">
        <div className="library-logo">🏛 LIBRARY</div>
        <div className="library-icons">
          <span>📩</span>
          <span>👤</span>
        </div>
      </header>

      <div className="form-container">
        <h2 className="form-title">Upcoming Books +</h2>
        <form className="book-form">
          <label>
            Name
            <input type="text" placeholder="Enter book name" />
          </label>
          <label>
            Author
            <input type="text" placeholder="Enter author name" />
          </label>
          <label>
            Book ID
            <input type="text" placeholder="Enter book ID" />
          </label>
          <label>
            Edition
            <input type="text" placeholder="Enter edition" />
          </label>
          <button type="submit" className="add-button">ADD</button>
        </form>
      </div>
    </div>
  );
};

export default Upcoming;