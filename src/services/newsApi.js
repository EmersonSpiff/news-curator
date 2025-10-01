import axios from 'axios';

// News API configuration - using our server proxy to avoid CORS issues
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo-key';
const NEWS_API_BASE = '/api'; // Our server proxy endpoint

// RSS Feeds for Maryland sources
export const RSS_FEEDS = {
  'Maryland Matters': 'https://www.marylandmatters.org/feed/',
  'Maryland Reporter': 'https://marylandreporter.com/feed/',
  'The Baltimore Sun': 'https://www.baltimoresun.com/arc/outboundfeeds/rss/?outputType=xml',
  'The Baltimore Banner': 'https://www.thebaltimorebanner.com/rss',
  'The Capital Gazette': 'https://www.capitalgazette.com/arc/outboundfeeds/rss/?outputType=xml',
  'The Daily Record': 'https://thedailyrecord.com/feed/',
  'WBAL-TV': 'https://www.wbaltv.com/arc/outboundfeeds/rss/?outputType=xml',
  'WYPR': 'https://www.wypr.org/rss.xml'
};

// Keywords for content filtering
export const CYBERSECURITY_KEYWORDS = [
  'cybersecurity', 'cyber security', 'cyber attack', 'data breach', 'hacking', 
  'malware', 'ransomware', 'phishing', 'security breach', 'information security',
  'network security', 'cyber defense', 'cyber threat', 'digital security'
];

export const QUANTUM_KEYWORDS = [
  'quantum', 'quantum computing', 'quantum technology', 'quantum cryptography',
  'quantum algorithm', 'quantum processor', 'quantum supremacy', 'quantum entanglement',
  'quantum mechanics', 'quantum physics', 'post-quantum', 'quantum resistant'
];

export const STEVE_HERSHEY_KEYWORDS = [
  'steve hershey', 'hershey', 'maryland gubernatorial', 'gubernatorial race',
  'governor maryland', 'maryland governor', 'eastern shore', 'kent county'
];

// News API service
export class NewsApiService {
  constructor() {
    // Browser-compatible RSS parsing will be handled via NewsAPI
  }

  // Fetch articles from News API
  async fetchFromNewsApi(query, sources = '', language = 'en', sortBy = 'publishedAt') {
    try {
      const params = {
        q: query,
        language,
        sortBy,
        pageSize: 50,
        apiKey: NEWS_API_KEY
      };

      if (sources) {
        params.sources = sources;
      }

      console.log('NewsAPI request params:', params);
      const response = await axios.get(`${NEWS_API_BASE}/news`, { params });
      console.log('NewsAPI response status:', response.data.status);
      console.log('NewsAPI response totalResults:', response.data.totalResults);
      
      if (response.data.status === 'ok') {
        const articles = this.transformNewsApiArticles(response.data.articles);
        console.log(`Transformed ${articles.length} articles for query: ${query}`);
        return articles;
      }
      
      throw new Error(response.data.message || 'News API request failed');
    } catch (error) {
      console.error('News API Error for query "' + query + '":', error.response?.data || error.message);
      return [];
    }
  }

  // Transform News API articles to our format
  transformNewsApiArticles(articles) {
    return articles.map(article => ({
      id: `newsapi-${article.url?.split('/').pop() || Math.random().toString(36).substr(2, 9)}`,
      title: article.title,
      summary: article.description || '',
      source: article.source.name,
      author: article.author || 'Unknown',
      publishDate: article.publishedAt,
      url: article.url,
      imageUrl: article.urlToImage,
      category: this.categorizeArticle(article.title + ' ' + (article.description || '')),
      tags: this.extractTags(article.title + ' ' + (article.description || '')),
      updateTime: this.getUpdateTime(),
      apiSource: 'NewsAPI'
    }));
  }

  // Fetch articles from RSS feeds (browser-compatible version)
  async fetchFromRSS() {
    const allArticles = [];

    // For browser compatibility, we'll use NewsAPI with Maryland-specific queries
    // instead of direct RSS parsing which requires Node.js polyfills
    const marylandQueries = [
      // More specific Maryland searches
      'Maryland cybersecurity',
      'Maryland quantum',
      'Baltimore cybersecurity',
      'Annapolis news',
      'Maryland gubernatorial',
      'Steve Hershey',
      'Maryland Matters',
      'Baltimore Sun',
      'Maryland politics',
      'Eastern Shore'
    ];

    for (const query of marylandQueries) {
      try {
        const articles = await this.fetchFromNewsApi(query, '', 'en', 'publishedAt');
        const marylandArticles = articles.map(article => ({
          ...article,
          apiSource: 'NewsAPI-Maryland'
        }));
        allArticles.push(...marylandArticles);
      } catch (error) {
        console.error(`Maryland News Query Error for "${query}":`, error);
      }
    }

    return allArticles;
  }

  // Categorize articles based on content
  categorizeArticle(content) {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('maryland') || lowerContent.includes('baltimore')) {
      if (CYBERSECURITY_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
        return 'maryland-cybersecurity';
      }
      if (QUANTUM_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
        return 'maryland-quantum';
      }
    }

    if (CYBERSECURITY_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
      return 'national-cybersecurity';
    }

    if (QUANTUM_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
      return 'national-quantum';
    }

    if (STEVE_HERSHEY_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
      return 'steve-hershey';
    }

    if (lowerContent.includes('gubernatorial') || lowerContent.includes('governor')) {
      return 'gubernatorial';
    }

    return 'general';
  }

  // Extract relevant tags from content
  extractTags(content) {
    const lowerContent = content.toLowerCase();
    const tags = [];

    [...CYBERSECURITY_KEYWORDS, ...QUANTUM_KEYWORDS, ...STEVE_HERSHEY_KEYWORDS].forEach(keyword => {
      if (lowerContent.includes(keyword.toLowerCase())) {
        tags.push(keyword);
      }
    });

    if (lowerContent.includes('maryland')) tags.push('maryland');
    if (lowerContent.includes('baltimore')) tags.push('baltimore');
    if (lowerContent.includes('annapolis')) tags.push('annapolis');

    return [...new Set(tags)]; // Remove duplicates
  }

  // Get current update time based on hour
  getUpdateTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 9) return '6:00 AM';
    if (hour >= 9 && hour < 12) return '9:00 AM';
    return '6:00 AM'; // Default to morning update
  }

  // Fetch all articles from multiple sources
  async fetchAllArticles() {
    const allArticles = [];
    
    // Try multiple specific searches (NewsAPI free tier doesn't support OR operators)
    const searchQueries = [
      'cybersecurity',
      'quantum',
      'Maryland',
      'Baltimore',
      'Steve Hershey'
    ];
    
    // Fetch articles for each query
    for (const query of searchQueries) {
      try {
        console.log(`Searching for: ${query}`);
        const articles = await this.fetchFromNewsApi(query);
        console.log(`Found ${articles.length} articles for "${query}"`);
        allArticles.push(...articles);
      } catch (error) {
        console.error(`Search query error for "${query}":`, error);
      }
    }

    // Combine and deduplicate articles
    const uniqueArticles = this.deduplicateArticles(allArticles);
    console.log(`Total unique articles found: ${uniqueArticles.length}`);

    return uniqueArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }

  // Remove duplicate articles based on title similarity
  deduplicateArticles(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const key = article.title.toLowerCase().replace(/[^\w\s]/g, '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

export const newsApiService = new NewsApiService();
