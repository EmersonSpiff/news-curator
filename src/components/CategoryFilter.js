import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', label: 'All News', icon: '📰' },
    { id: 'maryland-cybersecurity', label: 'MD Cybersecurity', icon: '🔒' },
    { id: 'maryland-quantum', label: 'MD Quantum', icon: '⚛️' },
    { id: 'national-cybersecurity', label: 'National Cybersecurity', icon: '🛡️' },
    { id: 'national-quantum', label: 'National Quantum', icon: '🔬' },
    { id: 'steve-hershey', label: 'Steve Hershey', icon: '👤' },
    { id: 'gubernatorial', label: 'Gubernatorial Race', icon: '🗳️' }
  ];

  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
