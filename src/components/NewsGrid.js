import React from 'react';
import NewsCard from './NewsCard';
import './NewsGrid.css';

const NewsGrid = ({ articles, bookmarkedArticles, onToggleBookmark, onShare }) => {
  if (articles.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">📰</div>
        <h3>No articles found</h3>
        <p>Try adjusting your filters or search terms to find relevant news.</p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsCard 
          key={`${article.id}-${index}`} 
          article={article}
          isBookmarked={bookmarkedArticles?.includes(article.id) || false}
          onToggleBookmark={onToggleBookmark}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
