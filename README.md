# Maryland News Curator

A comprehensive news curation website focused on Maryland-specific content with emphasis on cybersecurity, quantum technology, and gubernatorial politics. Features real-time news aggregation, advanced filtering, bookmark system, social sharing, and email newsletter functionality.

## Features

### 📰 Content Focus
- **Maryland News**: Cybersecurity and quantum-related content
- **National News**: Same focus areas (cybersecurity and quantum)
- **Political Coverage**: Everything about Steve Hershey and the Maryland gubernatorial race

### 📅 Update Schedule
- **6:00 AM**: Daily news briefing with overnight developments
- **9:00 AM**: Market updates and business news

### 🏛️ News Sources (Priority Order)
1. Wall Street Journal
2. Washington Post
3. New York Times
4. Maryland Matters
5. Maryland Reporter
6. The Baltimore Sun
7. The Baltimore Banner
8. The Capital Gazette (Annapolis)
9. The Daily Record
10. WBAL-TV / WBAL Radio
11. WYPR (NPR Baltimore)
12. Regional dailies/weeklies (Cecil Whig, Star Democrat, Maryland Independent)

### 🔍 Advanced Features
- **Real-time News Aggregation**: Live data from NewsAPI and RSS feeds
- **Advanced Filtering**: Date range, author, tags, and source filtering
- **Smart Search**: Full-text search across titles, summaries, and tags
- **Bookmark System**: Save articles for later reading with persistent storage
- **Social Sharing**: Share articles on Twitter, Facebook, LinkedIn, Reddit, Email, WhatsApp
- **Email Newsletter**: Customizable subscription with content preferences
- **Responsive Design**: Optimized for desktop and mobile devices
- **Update Schedule**: 6 AM and 9 AM automated updates with countdown timers
- **Source Prioritization**: Automatic sorting by news source priority
- **Article Analytics**: Track sharing and engagement metrics

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/jeannettebezinque/Documents/CursorProjects/news-curator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your News API key and other settings
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Quick Start Guide

### Using Sample Data (Default)
The app starts with sample data to demonstrate all features. You can:
- Browse articles by category
- Use advanced filters (date, author, tags)
- Bookmark articles
- Share articles on social media
- Subscribe to the newsletter

### Enabling Live Data
1. Get a free API key from [NewsAPI.org](https://newsapi.org/)
2. Add your API key to the environment configuration
3. Toggle "Live Data" in the app to fetch real news
4. Use the refresh button to get latest articles

### Key Features Overview
- **📅 Update Schedule**: See when the next news update will occur
- **🔍 Advanced Filters**: Filter by date range, authors, tags, and sources
- **🔖 Bookmarks**: Save articles and access them anytime
- **📤 Social Sharing**: Share articles across multiple platforms
- **📧 Newsletter**: Subscribe with custom content preferences

## Project Structure

```
src/
├── components/
│   ├── Header.js                    # Site header with search
│   ├── CategoryFilter.js            # Category filtering component
│   ├── SourceFilter.js              # News source filtering
│   ├── UpdateSchedule.js            # Update schedule display
│   ├── AdvancedFilters.js           # Advanced filtering options
│   ├── NewsletterSubscription.js    # Email newsletter signup
│   ├── BookmarkSystem.js            # Bookmark management
│   ├── SocialSharing.js             # Social media sharing
│   ├── NewsGrid.js                  # Article grid layout
│   └── NewsCard.js                  # Individual article cards
├── services/
│   └── newsApi.js                   # News API and RSS integration
├── config/
│   └── config.js                    # Application configuration
├── data/
│   └── newsData.js                  # News sources and sample articles
├── App.js                           # Original app component
├── AppEnhanced.js                   # Enhanced app with all features
├── App.css                          # Application styles
├── index.js                         # React entry point
└── index.css                        # Global styles
```

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Axios**: HTTP client for API requests
- **RSS Parser**: RSS feed parsing and processing
- **Date-fns**: Date manipulation and formatting
- **React Router**: Client-side routing (ready for future expansion)
- **CSS3**: Custom styling with responsive design and animations
- **JavaScript ES6+**: Modern JavaScript features and async/await

## Customization

### Adding New News Sources
Edit `src/data/newsData.js` and add new sources to the `newsSources` array:

```javascript
{
  name: 'Your News Source',
  priority: 15, // Lower number = higher priority
  category: 'maryland', // or 'national'
  url: 'https://yoursource.com'
}
```

### Adding Sample Articles
Add new articles to the `sampleArticles` array in `src/data/newsData.js`:

```javascript
{
  id: 'unique-id',
  title: 'Article Title',
  summary: 'Article summary...',
  source: 'Source Name',
  author: 'Author Name',
  publishDate: '2024-01-15T06:00:00Z',
  category: 'maryland-cybersecurity', // or other category
  url: 'https://example.com/article',
  tags: ['tag1', 'tag2'],
  updateTime: '6:00 AM' // or '9:00 AM'
}
```

### Modifying Update Schedule
Update the `updateSchedule` object in `src/data/newsData.js`:

```javascript
export const updateSchedule = {
  morning: {
    time: '06:00',
    description: 'Daily news briefing',
    sources: ['all']
  },
  market: {
    time: '09:00',
    description: 'Market updates',
    sources: ['Wall Street Journal', 'The Daily Record']
  }
};
```

## API Integration

### NewsAPI.org
- Free tier: 1,000 requests per day
- Premium features available
- Global news coverage
- Real-time updates

### RSS Feeds
- Maryland-specific sources
- Automatic content categorization
- Keyword-based filtering
- Scheduled updates

## Deployment

### Railway.com (Recommended)
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Other Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Connect repository and build
- **Heroku**: Use included Procfile

## Future Enhancements

- User authentication and profiles
- Personalized news recommendations
- Advanced analytics dashboard
- Mobile app (React Native)
- Push notifications
- Comment system
- Article rating and reviews
- AI-powered content summarization

## Contributing

This is a personal news curation project. Feel free to fork and modify for your own use.

## License

MIT License - feel free to use this code for your own projects.
