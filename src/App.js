import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SourceFilter from './components/SourceFilter';
import UpdateSchedule from './components/UpdateSchedule';
import NewsGrid from './components/NewsGrid';
import { newsSources, sampleArticles } from './data/newsData';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSources, setSelectedSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort articles based on selected filters and source priority
  const filteredArticles = useMemo(() => {
    let filtered = sampleArticles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by sources
    if (selectedSources.length > 0) {
      filtered = filtered.filter(article => selectedSources.includes(article.source));
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.summary.toLowerCase().includes(term) ||
        article.source.toLowerCase().includes(term)
      );
    }

    // Sort by source priority
    filtered.sort((a, b) => {
      const aPriority = newsSources.find(s => s.name === a.source)?.priority || 999;
      const bPriority = newsSources.find(s => s.name === b.source)?.priority || 999;
      return aPriority - bPriority;
    });

    return filtered;
  }, [selectedCategory, selectedSources, searchTerm]);

  const handleSourceToggle = (sourceName) => {
    setSelectedSources(prev => 
      prev.includes(sourceName) 
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    );
  };

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="main-content">
        <div className="container">
          <UpdateSchedule />
          
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

          <div className="results-header">
            <h2>
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {selectedSources.length > 0 && ` from ${selectedSources.length} source${selectedSources.length !== 1 ? 's' : ''}`}
            </h2>
          </div>

          <NewsGrid articles={filteredArticles} />
        </div>
      </main>
    </div>
  );
}

export default App;
