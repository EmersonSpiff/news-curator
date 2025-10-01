import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SourceFilter from './components/SourceFilter';
import UpdateSchedule from './components/UpdateSchedule';
import AdvancedFilters from './components/AdvancedFilters';
import NewsletterSubscription from './components/NewsletterSubscription';
import BookmarkSystem from './components/BookmarkSystem';
import NewsGrid from './components/NewsGrid';
import { newsSources, sampleArticles } from './data/newsData';
import { newsApiService } from './services/newsApi';
import { format, subDays } from 'date-fns';
import './App.css';

function AppEnhanced() {
  // Basic filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSources, setSelectedSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced filters
  const [dateRange, setDateRange] = useState({ start: null, end: null, label: 'All time' });
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const [sortBy, setSortBy] = useState('date-desc');

  // Data and loading states
  const [articles, setArticles] = useState(sampleArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [useLiveData, setUseLiveData] = useState(false);

  // Bookmark system
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  // Newsletter
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Extract unique authors and tags from articles
  const availableAuthors = useMemo(() => {
    const authors = new Set();
    articles.forEach(article => {
      if (article.author && article.author !== 'Unknown') {
        authors.add(article.author);
      }
    });
    return Array.from(authors).sort();
  }, [articles]);

  const availableTags = useMemo(() => {
    const tags = new Set();
    articles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [articles]);

  // Fetch live data
  const fetchLiveData = async () => {
    setIsLoading(true);
    try {
      const liveArticles = await newsApiService.fetchAllArticles();
      setArticles(liveArticles);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch live data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Source filter
    if (selectedSources.length > 0) {
      filtered = filtered.filter(article => selectedSources.includes(article.source));
    }

    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.summary.toLowerCase().includes(term) ||
        article.source.toLowerCase().includes(term) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.publishDate);
        if (dateRange.start && articleDate < dateRange.start) return false;
        if (dateRange.end && articleDate > dateRange.end) return false;
        return true;
      });
    }

    // Author filter
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter(article => selectedAuthors.includes(article.author));
    }

    // Tag filter
    if (tagFilters.length > 0) {
      filtered = filtered.filter(article => 
        article.tags && tagFilters.some(tag => article.tags.includes(tag))
      );
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'source-priority':
          const aPriority = newsSources.find(s => s.name === a.source)?.priority || 999;
          const bPriority = newsSources.find(s => s.name === b.source)?.priority || 999;
          return aPriority - bPriority;
        case 'relevance':
          // Simple relevance scoring based on keyword matches
          const aScore = (a.title + ' ' + a.summary).toLowerCase().split(' ').length;
          const bScore = (b.title + ' ' + b.summary).toLowerCase().split(' ').length;
          return bScore - aScore;
        case 'shares':
          // Mock share count for demonstration
          return Math.random() - 0.5;
        case 'date-desc':
        default:
          return new Date(b.publishDate) - new Date(a.publishDate);
      }
    });

    return filtered;
  }, [
    articles, selectedCategory, selectedSources, searchTerm, 
    dateRange, selectedAuthors, tagFilters, sortBy
  ]);

  // Handle bookmark toggle
  const handleToggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Handle sharing
  const handleShare = (articleId, platform) => {
    console.log(`Article ${articleId} shared on ${platform}`);
    // Here you would typically send analytics data
  };

  // Handle source toggle
  const handleSourceToggle = (sourceName) => {
    setSelectedSources(prev => 
      prev.includes(sourceName) 
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    );
  };

  // Auto-refresh data every hour
  useEffect(() => {
    const interval = setInterval(() => {
      if (useLiveData) {
        fetchLiveData();
      }
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [useLiveData]);

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="main-content">
        <div className="container">
          {/* Update Schedule */}
          <UpdateSchedule />
          
          {/* Newsletter Subscription */}
          {showNewsletter && (
            <NewsletterSubscription 
              onSubscribe={(data) => {
                console.log('Newsletter subscription:', data);
                setShowNewsletter(false);
              }}
            />
          )}

          {/* Bookmark System */}
          <BookmarkSystem 
            articles={articles}
            onBookmarkChange={setBookmarkedArticles}
          />

          {/* Data Source Toggle */}
          <div className="data-source-toggle">
            <button 
              className={`toggle-btn ${useLiveData ? 'active' : ''}`}
              onClick={() => setUseLiveData(!useLiveData)}
            >
              {useLiveData ? '🔄' : '📰'} 
              {useLiveData ? 'Live Data' : 'Sample Data'}
            </button>
            {useLiveData && (
              <button 
                className="refresh-btn"
                onClick={fetchLiveData}
                disabled={isLoading}
              >
                {isLoading ? '⏳' : '🔄'} Refresh
              </button>
            )}
            <button 
              className="newsletter-btn"
              onClick={() => setShowNewsletter(!showNewsletter)}
            >
              📧 {showNewsletter ? 'Hide Newsletter' : 'Newsletter'}
            </button>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedAuthors={selectedAuthors}
            setSelectedAuthors={setSelectedAuthors}
            tagFilters={tagFilters}
            setTagFilters={setTagFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            availableAuthors={availableAuthors}
            availableTags={availableTags}
          />
          
          {/* Basic Filters */}
          <div className="filters-section">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <SourceFilter 
              selectedSources={selectedSources}
              onSourceToggle={handleSourceToggle}
              newsSources={newsSources}
            />
          </div>

          {/* Results Header */}
          <div className="results-header">
            <h2>
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
              {selectedSources.length > 0 && ` from ${selectedSources.length} source${selectedSources.length !== 1 ? 's' : ''}`}
              {useLiveData && ` (Live data, last updated: ${format(lastUpdate, 'MMM dd, h:mm a')})`}
            </h2>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="loading">
              <div className="loading-spinner">⏳</div>
              <p>Fetching latest news...</p>
            </div>
          )}

          {/* News Grid */}
          <NewsGrid 
            articles={filteredArticles}
            bookmarkedArticles={bookmarkedArticles}
            onToggleBookmark={handleToggleBookmark}
            onShare={handleShare}
          />
        </div>
      </main>
    </div>
  );
}

export default AppEnhanced;
