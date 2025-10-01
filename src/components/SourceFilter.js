import React from 'react';
import './SourceFilter.css';

const SourceFilter = ({ selectedSources, onSourceToggle, newsSources }) => {
  const prioritySources = newsSources
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 10); // Show top 10 sources

  return (
    <div className="source-filter">
      <h3>News Sources</h3>
      <div className="source-buttons">
        {prioritySources.map(source => (
          <button
            key={source.name}
            className={`source-btn ${selectedSources.includes(source.name) ? 'active' : ''}`}
            onClick={() => onSourceToggle(source.name)}
          >
            <span className="source-priority">{source.priority}</span>
            <span className="source-name">{source.name}</span>
          </button>
        ))}
      </div>
      
      {selectedSources.length > 0 && (
        <div className="selected-sources">
          <p>Filtering by: {selectedSources.join(', ')}</p>
          <button 
            className="clear-filters-btn"
            onClick={() => selectedSources.forEach(source => onSourceToggle(source))}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default SourceFilter;

