import React, { useState, useEffect } from 'react';
import './BookmarkSystem.css';

const BookmarkSystem = ({ articles, onBookmarkChange }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('newsBookmarks');
    if (savedBookmarks) {
      setBookmarkedArticles(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem('newsBookmarks', JSON.stringify(bookmarkedArticles));
    onBookmarkChange && onBookmarkChange(bookmarkedArticles);
  }, [bookmarkedArticles, onBookmarkChange]);

  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => {
      const isBookmarked = prev.includes(articleId);
      if (isBookmarked) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedArticles([]);
  };

  const getBookmarkedArticles = () => {
    return articles.filter(article => bookmarkedArticles.includes(article.id));
  };

  const isBookmarked = (articleId) => {
    return bookmarkedArticles.includes(articleId);
  };

  return (
    <div className="bookmark-system">
      <div className="bookmark-header">
        <button 
          className={`bookmark-toggle ${showBookmarks ? 'active' : ''}`}
          onClick={() => setShowBookmarks(!showBookmarks)}
        >
          <span className="bookmark-icon">
            {showBookmarks ? '📖' : '🔖'}
          </span>
          <span className="bookmark-text">
            {showBookmarks ? 'Hide Bookmarks' : 'Show Bookmarks'}
          </span>
          <span className="bookmark-count">
            ({bookmarkedArticles.length})
          </span>
        </button>
        
        {bookmarkedArticles.length > 0 && (
          <button className="clear-bookmarks-btn" onClick={clearAllBookmarks}>
            Clear All
          </button>
        )}
      </div>

      {showBookmarks && (
        <div className="bookmarks-panel">
          <div className="bookmarks-header">
            <h3>📚 Your Saved Articles</h3>
            <p>{bookmarkedArticles.length} article{bookmarkedArticles.length !== 1 ? 's' : ''} saved</p>
          </div>

          {bookmarkedArticles.length === 0 ? (
            <div className="empty-bookmarks">
              <div className="empty-icon">📰</div>
              <h4>No bookmarks yet</h4>
              <p>Click the bookmark icon on any article to save it for later reading.</p>
            </div>
          ) : (
            <div className="bookmarks-grid">
              {getBookmarkedArticles().map(article => (
                <div key={article.id} className="bookmark-item">
                  <div className="bookmark-item-header">
                    <span className="bookmark-source">{article.source}</span>
                    <button 
                      className="remove-bookmark-btn"
                      onClick={() => toggleBookmark(article.id)}
                      title="Remove bookmark"
                    >
                      ❌
                    </button>
                  </div>
                  
                  <h4 className="bookmark-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h4>
                  
                  <p className="bookmark-summary">{article.summary}</p>
                  
                  <div className="bookmark-meta">
                    <span className="bookmark-author">{article.author}</span>
                    <span className="bookmark-date">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkSystem;
