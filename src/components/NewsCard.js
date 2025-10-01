import React from 'react';
import SocialSharing from './SocialSharing';
import './NewsCard.css';

const NewsCard = ({ article, isBookmarked, onToggleBookmark, onShare }) => {
  const getBadgeClass = (category) => {
    if (category.includes('cybersecurity')) return 'badge-cybersecurity';
    if (category.includes('quantum')) return 'badge-quantum';
    if (category.includes('steve-hershey') || category.includes('gubernatorial')) return 'badge-politics';
    if (category.includes('maryland')) return 'badge-maryland';
    return 'badge-national';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="news-card">
      <div className="news-card-header">
        <div className="source-info">
          <span className="source-name">{article.source}</span>
          <span className="publish-date">{formatDate(article.publishDate)}</span>
        </div>
        <div className="badges">
          <span className={`badge ${getBadgeClass(article.category)}`}>
            {article.category.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      <div className="news-card-content">
        <h3 className="news-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        
        <p className="news-summary">{article.summary}</p>
        
        <div className="news-meta">
          <span className="author">{article.author}</span>
          {article.tags && article.tags.length > 0 && (
            <div className="tags">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="news-card-footer">
        <div className="card-actions">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            Read Full Article →
          </a>
          
          <div className="card-interactions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => onToggleBookmark && onToggleBookmark(article.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              {isBookmarked ? '🔖' : '📖'}
            </button>
            
            <SocialSharing 
              article={article} 
              onShare={onShare}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
