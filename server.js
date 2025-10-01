const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// NewsAPI configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || '75cf540b324b4c4ea4e13571427a90ac';
const NEWS_API_BASE = 'https://newsapi.org/v2';

// Proxy endpoint for NewsAPI
app.get('/api/news', async (req, res) => {
  try {
    const { q, sources, language, sortBy, pageSize } = req.query;
    
    const params = {
      q: q || '',
      language: language || 'en',
      sortBy: sortBy || 'publishedAt',
      pageSize: pageSize || 50,
      apiKey: NEWS_API_KEY
    };

    if (sources) {
      params.sources = sources;
    }

    console.log('Proxying NewsAPI request:', params);
    
    const response = await axios.get(`${NEWS_API_BASE}/everything`, { params });
    
    if (response.data.status === 'ok') {
      res.json(response.data);
    } else {
      res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    console.error('NewsAPI Proxy Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
