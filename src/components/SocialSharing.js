import React, { useState } from 'react';
import './SocialSharing.css';

const SocialSharing = ({ article, onShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(article.url);
  const shareTitle = encodeURIComponent(article.title);
  const shareText = encodeURIComponent(`${article.title} - ${article.summary}`);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}&hashtags=MarylandNews,Cybersecurity,Quantum`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    reddit: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
    email: `mailto:?subject=${shareTitle}&body=${shareText}%0A%0ARead more: ${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`
  };

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(article.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }

    // Track sharing analytics
    onShare && onShare(article.id, platform);
    setIsOpen(false);
  };

  const shareCount = Math.floor(Math.random() * 50) + 1; // Mock share count

  return (
    <div className="social-sharing">
      <div className="share-trigger">
        <button 
          className="share-btn"
          onClick={() => setIsOpen(!isOpen)}
          title="Share article"
        >
          <span className="share-icon">📤</span>
          <span className="share-count">{shareCount}</span>
        </button>
      </div>

      {isOpen && (
        <div className="share-dropdown">
          <div className="share-options">
            <button 
              className="share-option twitter"
              onClick={() => handleShare('twitter')}
              title="Share on Twitter"
            >
              <span className="share-platform-icon">🐦</span>
              <span>Twitter</span>
            </button>

            <button 
              className="share-option facebook"
              onClick={() => handleShare('facebook')}
              title="Share on Facebook"
            >
              <span className="share-platform-icon">📘</span>
              <span>Facebook</span>
            </button>

            <button 
              className="share-option linkedin"
              onClick={() => handleShare('linkedin')}
              title="Share on LinkedIn"
            >
              <span className="share-platform-icon">💼</span>
              <span>LinkedIn</span>
            </button>

            <button 
              className="share-option reddit"
              onClick={() => handleShare('reddit')}
              title="Share on Reddit"
            >
              <span className="share-platform-icon">🤖</span>
              <span>Reddit</span>
            </button>

            <button 
              className="share-option email"
              onClick={() => handleShare('email')}
              title="Share via Email"
            >
              <span className="share-platform-icon">📧</span>
              <span>Email</span>
            </button>

            <button 
              className="share-option whatsapp"
              onClick={() => handleShare('whatsapp')}
              title="Share on WhatsApp"
            >
              <span className="share-platform-icon">💬</span>
              <span>WhatsApp</span>
            </button>

            <button 
              className={`share-option copy ${copied ? 'copied' : ''}`}
              onClick={() => handleShare('copy')}
              title="Copy link"
            >
              <span className="share-platform-icon">
                {copied ? '✅' : '🔗'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="share-meta">
            <div className="article-preview">
              <h4>{article.title}</h4>
              <p>{article.source} • {new Date(article.publishDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="share-overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};

export default SocialSharing;
