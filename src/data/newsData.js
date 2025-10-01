// News sources prioritized according to user preferences
export const newsSources = [
  { name: 'Wall Street Journal', priority: 1, category: 'national', url: 'https://wsj.com' },
  { name: 'Washington Post', priority: 2, category: 'national', url: 'https://washingtonpost.com' },
  { name: 'New York Times', priority: 3, category: 'national', url: 'https://nytimes.com' },
  { name: 'Maryland Matters', priority: 4, category: 'maryland', url: 'https://marylandmatters.org' },
  { name: 'Maryland Reporter', priority: 5, category: 'maryland', url: 'https://marylandreporter.com' },
  { name: 'The Baltimore Sun', priority: 6, category: 'maryland', url: 'https://baltimoresun.com' },
  { name: 'The Baltimore Banner', priority: 7, category: 'maryland', url: 'https://thebaltimorebanner.com' },
  { name: 'The Capital Gazette', priority: 8, category: 'maryland', url: 'https://capgaznews.com' },
  { name: 'The Daily Record', priority: 9, category: 'maryland', url: 'https://thedailyrecord.com' },
  { name: 'WBAL-TV', priority: 10, category: 'maryland', url: 'https://wbaltv.com' },
  { name: 'WYPR', priority: 11, category: 'maryland', url: 'https://wypr.org' },
  { name: 'Cecil Whig', priority: 12, category: 'maryland', url: 'https://cecilwhig.com' },
  { name: 'Star Democrat', priority: 13, category: 'maryland', url: 'https://stardem.com' },
  { name: 'Maryland Independent', priority: 14, category: 'maryland', url: 'https://somdnews.com' }
];

// Sample articles for fallback only (when API fails)
export const sampleArticles = [];

// Update schedule configuration
export const updateSchedule = {
  morning: {
    time: '06:00',
    description: 'Daily news briefing with overnight developments',
    sources: ['all']
  },
  market: {
    time: '09:00',
    description: 'Market updates and business news',
    sources: ['Wall Street Journal', 'The Daily Record', 'Maryland Reporter']
  }
};

// Helper function to get articles by update time
export const getArticlesByUpdateTime = (updateTime) => {
  return sampleArticles.filter(article => article.updateTime === updateTime);
};

// Helper function to get articles by category
export const getArticlesByCategory = (category) => {
  return sampleArticles.filter(article => article.category === category);
};

// Helper function to get articles by source
export const getArticlesBySource = (sourceName) => {
  return sampleArticles.filter(article => article.source === sourceName);
};
