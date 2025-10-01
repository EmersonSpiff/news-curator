// Application configuration
export const config = {
  // News API Configuration
  newsApi: {
    key: process.env.REACT_APP_NEWS_API_KEY || 'demo-key',
    baseUrl: 'https://newsapi.org/v2'
  },

  // Application Settings
  app: {
    name: process.env.REACT_APP_APP_NAME || 'Maryland News Curator',
    version: process.env.REACT_APP_VERSION || '1.0.0'
  },

  // Update Schedule
  schedule: {
    morning: process.env.REACT_APP_MORNING_UPDATE_TIME || '06:00',
    market: process.env.REACT_APP_MARKET_UPDATE_TIME || '09:00'
  },

  // RSS Feeds Configuration
  rssFeeds: {
    'Maryland Matters': process.env.REACT_APP_MARYLAND_MATTERS_RSS || 'https://www.marylandmatters.org/feed/',
    'Maryland Reporter': 'https://marylandreporter.com/feed/',
    'The Baltimore Sun': process.env.REACT_APP_BALTIMORE_SUN_RSS || 'https://www.baltimoresun.com/arc/outboundfeeds/rss/?outputType=xml',
    'The Baltimore Banner': 'https://www.thebaltimorebanner.com/rss',
    'The Capital Gazette': 'https://www.capitalgazette.com/arc/outboundfeeds/rss/?outputType=xml',
    'The Daily Record': 'https://thedailyrecord.com/feed/',
    'WBAL-TV': 'https://www.wbaltv.com/arc/outboundfeeds/rss/?outputType=xml',
    'WYPR': 'https://www.wypr.org/rss.xml'
  },

  // Analytics Configuration
  analytics: {
    enabled: process.env.REACT_APP_ANALYTICS_ENABLED === 'true',
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || null
  },

  // Feature Flags
  features: {
    liveData: true,
    newsletter: true,
    bookmarks: true,
    socialSharing: true,
    advancedFilters: true
  }
};

export default config;
