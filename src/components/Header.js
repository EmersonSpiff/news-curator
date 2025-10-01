import React from 'react';
import './Header.css';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-title">
            <h1>Maryland News Curator</h1>
            <p>Cybersecurity • Quantum Technology • Gubernatorial Politics</p>
          </div>
          
          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
