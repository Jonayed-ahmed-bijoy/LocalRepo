// components/Library.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TopBar from './TopBar';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const iconSize = 28; // Adjust based on your icon size

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="library-container">
      <TopBar />
      
      <main className="library-content">
        <h1>LIBRARY</h1>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              SEARCH
            </button>
          </form>
        </div>

        <nav className="library-nav">
          <NavLink to="/library/books" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/book.png" 
              alt="Books" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            BOOKS
          </NavLink>

          <NavLink to="/library/card" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/card.png" 
              alt="Library Card" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            LIBRARY CARD
          </NavLink>

          <NavLink to="/library/rooms" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/room.png" 
              alt="Rooms" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            ROOMS
          </NavLink>

          <NavLink to="/library/upcoming" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/upcoming.png" 
              alt="Upcoming" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            UPCOMING
          </NavLink>

          <NavLink to="/library/account" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/user.png" 
              alt="Account" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            MY ACCOUNT
          </NavLink>

          <NavLink to="/library/history" className={({ isActive }) => isActive ? 'nav-active' : ''}>
            <img 
              src="/icons/history.png" 
              alt="History" 
              width={iconSize}
              height={iconSize}
              className="nav-icon"
            />
            HISTORY
          </NavLink>
        </nav>
      </main>
    </div>
  );
};

export default Library;