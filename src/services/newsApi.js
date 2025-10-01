import axios from 'axios';
import Parser from 'rss-parser';

// News API configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo-key';
const NEWS_API_BASE = 'https://newsapi.org/v2';

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
    this.parser = new Parser();
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

      const response = await axios.get(`${NEWS_API_BASE}/everything`, { params });
      
      if (response.data.status === 'ok') {
        return this.transformNewsApiArticles(response.data.articles);
      }
      
      throw new Error(response.data.message || 'News API request failed');
    } catch (error) {
      console.error('News API Error:', error);
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

  // Fetch articles from RSS feeds
  async fetchFromRSS() {
    const allArticles = [];

    for (const [sourceName, feedUrl] of Object.entries(RSS_FEEDS)) {
      try {
        const feed = await this.parser.parseURL(feedUrl);
        
        const articles = feed.items.map(item => ({
          id: `rss-${item.guid || item.link?.split('/').pop() || Math.random().toString(36).substr(2, 9)}`,
          title: item.title,
          summary: item.contentSnippet || item.content || '',
          source: sourceName,
          author: item.creator || 'Unknown',
          publishDate: item.pubDate || new Date().toISOString(),
          url: item.link,
          imageUrl: item.enclosure?.url || null,
          category: this.categorizeArticle(item.title + ' ' + (item.contentSnippet || '')),
          tags: this.extractTags(item.title + ' ' + (item.contentSnippet || '')),
          updateTime: this.getUpdateTime(),
          apiSource: 'RSS'
        }));

        allArticles.push(...articles);
      } catch (error) {
        console.error(`RSS Feed Error for ${sourceName}:`, error);
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
    const [newsApiArticles, rssArticles] = await Promise.all([
      this.fetchFromNewsApi('cybersecurity OR quantum OR "steve hershey" OR maryland'),
      this.fetchFromRSS()
    ]);

    // Combine and deduplicate articles
    const allArticles = [...newsApiArticles, ...rssArticles];
    const uniqueArticles = this.deduplicateArticles(allArticles);

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
