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

// Sample articles for demonstration
export const sampleArticles = [
  // Maryland Cybersecurity
  {
    id: 'md-cyber-1',
    title: 'Maryland State Agencies Face Increased Cyber Threats in 2024',
    summary: 'Recent cybersecurity assessments reveal that Maryland state agencies have seen a 40% increase in cyber attacks compared to last year, with particular focus on election infrastructure and health department systems.',
    source: 'The Baltimore Sun',
    author: 'Sarah Johnson',
    publishDate: '2024-01-15T06:00:00Z',
    category: 'maryland-cybersecurity',
    url: 'https://example.com/md-cyber-threats',
    tags: ['cybersecurity', 'state government', 'election security'],
    updateTime: '6:00 AM'
  },
  {
    id: 'md-cyber-2',
    title: 'University of Maryland Launches Quantum Cybersecurity Research Initiative',
    summary: 'The University of Maryland announces a $50M investment in quantum-resistant cryptography research, positioning the state as a leader in post-quantum security solutions.',
    source: 'Maryland Matters',
    author: 'Michael Chen',
    publishDate: '2024-01-15T06:15:00Z',
    category: 'maryland-cybersecurity',
    url: 'https://example.com/umd-quantum-cyber',
    tags: ['quantum computing', 'cybersecurity', 'research', 'university'],
    updateTime: '6:00 AM'
  },

  // Maryland Quantum
  {
    id: 'md-quantum-1',
    title: 'Maryland Quantum Initiative Receives Federal Funding Boost',
    summary: 'The state\'s quantum technology initiative receives additional $25M in federal funding, accelerating development of quantum computing infrastructure in Baltimore and College Park.',
    source: 'The Daily Record',
    author: 'Jennifer Liu',
    publishDate: '2024-01-15T06:30:00Z',
    category: 'maryland-quantum',
    url: 'https://example.com/md-quantum-funding',
    tags: ['quantum computing', 'federal funding', 'technology', 'research'],
    updateTime: '6:00 AM'
  },

  // National Cybersecurity
  {
    id: 'nat-cyber-1',
    title: 'Major Cybersecurity Breach Affects 50 Million Americans',
    summary: 'A sophisticated cyber attack has compromised personal data of millions of Americans, with cybersecurity experts warning of potential long-term implications for national security.',
    source: 'Wall Street Journal',
    author: 'David Rodriguez',
    publishDate: '2024-01-15T06:45:00Z',
    category: 'national-cybersecurity',
    url: 'https://example.com/major-breach',
    tags: ['data breach', 'national security', 'cybersecurity'],
    updateTime: '6:00 AM'
  },
  {
    id: 'nat-cyber-2',
    title: 'White House Announces New Cybersecurity Strategy',
    summary: 'The Biden administration unveils a comprehensive cybersecurity strategy focusing on critical infrastructure protection and public-private partnerships.',
    source: 'Washington Post',
    author: 'Emily Watson',
    publishDate: '2024-01-15T07:00:00Z',
    category: 'national-cybersecurity',
    url: 'https://example.com/white-house-cyber-strategy',
    tags: ['white house', 'cybersecurity strategy', 'critical infrastructure'],
    updateTime: '6:00 AM'
  },

  // National Quantum
  {
    id: 'nat-quantum-1',
    title: 'Quantum Computing Breakthrough Promises New Era of Innovation',
    summary: 'Scientists achieve a major milestone in quantum computing, demonstrating error correction capabilities that could revolutionize cryptography and scientific research.',
    source: 'New York Times',
    author: 'Dr. Alex Thompson',
    publishDate: '2024-01-15T07:15:00Z',
    category: 'national-quantum',
    url: 'https://example.com/quantum-breakthrough',
    tags: ['quantum computing', 'breakthrough', 'innovation', 'cryptography'],
    updateTime: '6:00 AM'
  },

  // Steve Hershey
  {
    id: 'hershey-1',
    title: 'Steve Hershey Announces Comprehensive Economic Plan for Maryland',
    summary: 'Gubernatorial candidate Steve Hershey unveils his economic development strategy, focusing on technology sector growth and cybersecurity job creation.',
    source: 'Maryland Reporter',
    author: 'Lisa Martinez',
    publishDate: '2024-01-15T07:30:00Z',
    category: 'steve-hershey',
    url: 'https://example.com/hershey-economic-plan',
    tags: ['steve hershey', 'gubernatorial race', 'economic policy', 'technology'],
    updateTime: '6:00 AM'
  },
  {
    id: 'hershey-2',
    title: 'Hershey Campaign Gains Momentum with Eastern Shore Support',
    summary: 'Recent polling shows Steve Hershey gaining significant support from Eastern Shore voters, particularly in cybersecurity and quantum technology sectors.',
    source: 'The Capital Gazette',
    author: 'Robert Kim',
    publishDate: '2024-01-15T07:45:00Z',
    category: 'steve-hershey',
    url: 'https://example.com/hershey-momentum',
    tags: ['steve hershey', 'polling', 'eastern shore', 'campaign'],
    updateTime: '6:00 AM'
  },

  // Gubernatorial Race
  {
    id: 'gov-race-1',
    title: 'Maryland Gubernatorial Race Heats Up with Technology Focus',
    summary: 'Candidates in the Maryland gubernatorial race are emphasizing technology policy, with cybersecurity and quantum computing emerging as key campaign issues.',
    source: 'The Baltimore Banner',
    author: 'Amanda Foster',
    publishDate: '2024-01-15T08:00:00Z',
    category: 'gubernatorial',
    url: 'https://example.com/gov-race-technology',
    tags: ['gubernatorial race', 'technology policy', 'cybersecurity', 'election'],
    updateTime: '6:00 AM'
  },

  // Market Updates (9 AM)
  {
    id: 'market-1',
    title: 'Cybersecurity Stocks Rally on Government Contract Announcements',
    summary: 'Shares of Maryland-based cybersecurity firms surge following announcements of new government contracts worth over $2 billion.',
    source: 'Wall Street Journal',
    author: 'Mark Stevens',
    publishDate: '2024-01-15T09:00:00Z',
    category: 'national-cybersecurity',
    url: 'https://example.com/cyber-stocks-rally',
    tags: ['stock market', 'cybersecurity', 'government contracts', 'maryland'],
    updateTime: '9:00 AM'
  },
  {
    id: 'market-2',
    title: 'Quantum Technology Companies See Investment Surge',
    summary: 'Venture capital funding in quantum technology companies reaches record levels, with several Maryland startups securing major investments.',
    source: 'The Daily Record',
    author: 'Rachel Green',
    publishDate: '2024-01-15T09:15:00Z',
    category: 'maryland-quantum',
    url: 'https://example.com/quantum-investment-surge',
    tags: ['venture capital', 'quantum technology', 'investment', 'startups'],
    updateTime: '9:00 AM'
  }
];

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
