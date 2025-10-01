import React, { useState } from 'react';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import './AdvancedFilters.css';

const AdvancedFilters = ({ 
  dateRange, 
  setDateRange, 
  selectedAuthors, 
  setSelectedAuthors, 
  tagFilters, 
  setTagFilters,
  sortBy,
  setSortBy,
  availableAuthors,
  availableTags 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickDateRanges = [
    { label: 'Last 24 hours', value: '1d' },
    { label: 'Last 3 days', value: '3d' },
    { label: 'Last week', value: '1w' },
    { label: 'Last month', value: '1m' },
    { label: 'All time', value: 'all' }
  ];

  const sortOptions = [
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' },
    { label: 'Source Priority', value: 'source-priority' },
    { label: 'Relevance', value: 'relevance' },
    { label: 'Most Shared', value: 'shares' }
  ];

  const handleQuickDateRange = (range) => {
    const now = new Date();
    let startDate = null;

    switch (range) {
      case '1d':
        startDate = subDays(now, 1);
        break;
      case '3d':
        startDate = subDays(now, 3);
        break;
      case '1w':
        startDate = subWeeks(now, 1);
        break;
      case '1m':
        startDate = subMonths(now, 1);
        break;
      case 'all':
        startDate = null;
        break;
      default:
        return;
    }

    setDateRange({
      start: startDate,
      end: now,
      label: quickDateRanges.find(r => r.value === range)?.label || 'Custom'
    });
  };

  const handleAuthorToggle = (author) => {
    setSelectedAuthors(prev => 
      prev.includes(author) 
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const handleTagToggle = (tag) => {
    setTagFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setDateRange({ start: null, end: null, label: 'All time' });
    setSelectedAuthors([]);
    setTagFilters([]);
    setSortBy('date-desc');
  };

  const hasActiveFilters = selectedAuthors.length > 0 || tagFilters.length > 0 || 
    (dateRange.start || dateRange.end) || sortBy !== 'date-desc';

  return (
    <div className="advanced-filters">
      <div className="filters-header">
        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>🔍 Advanced Filters</span>
          <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </button>
        
        {hasActiveFilters && (
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="filters-content">
          {/* Date Range Filter */}
          <div className="filter-section">
            <h4>📅 Date Range</h4>
            <div className="quick-dates">
              {quickDateRanges.map(range => (
                <button
                  key={range.value}
                  className={`quick-date-btn ${dateRange.label === range.label ? 'active' : ''}`}
                  onClick={() => handleQuickDateRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <div className="custom-date-inputs">
              <div className="date-input-group">
                <label>From:</label>
                <input
                  type="date"
                  value={dateRange.start ? format(dateRange.start, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange(prev => ({ 
                    ...prev, 
                    start: e.target.value ? new Date(e.target.value) : null 
                  }))}
                />
              </div>
              <div className="date-input-group">
                <label>To:</label>
                <input
                  type="date"
                  value={dateRange.end ? format(dateRange.end, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange(prev => ({ 
                    ...prev, 
                    end: e.target.value ? new Date(e.target.value) : null 
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Authors Filter */}
          <div className="filter-section">
            <h4>✍️ Authors</h4>
            <div className="filter-chips">
              {availableAuthors.slice(0, 10).map(author => (
                <button
                  key={author}
                  className={`filter-chip ${selectedAuthors.includes(author) ? 'active' : ''}`}
                  onClick={() => handleAuthorToggle(author)}
                >
                  {author}
                </button>
              ))}
            </div>
            {availableAuthors.length > 10 && (
              <p className="filter-note">
                Showing top 10 authors. {availableAuthors.length - 10} more available.
              </p>
            )}
          </div>

          {/* Tags Filter */}
          <div className="filter-section">
            <h4>🏷️ Tags</h4>
            <div className="filter-chips">
              {availableTags.slice(0, 15).map(tag => (
                <button
                  key={tag}
                  className={`filter-chip ${tagFilters.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {availableTags.length > 15 && (
              <p className="filter-note">
                Showing top 15 tags. {availableTags.length - 15} more available.
              </p>
            )}
          </div>

          {/* Sort Options */}
          <div className="filter-section">
            <h4>📊 Sort By</h4>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <div className="active-filters-list">
                {dateRange.start && (
                  <span className="active-filter">
                    📅 {format(dateRange.start, 'MMM dd')} - {format(dateRange.end, 'MMM dd')}
                  </span>
                )}
                {selectedAuthors.map(author => (
                  <span key={author} className="active-filter">
                    ✍️ {author}
                  </span>
                ))}
                {tagFilters.map(tag => (
                  <span key={tag} className="active-filter">
                    🏷️ #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;

