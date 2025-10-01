import React, { useState } from 'react';
import './NewsletterSubscription.css';

const NewsletterSubscription = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    marylandCybersecurity: true,
    marylandQuantum: true,
    nationalCybersecurity: true,
    nationalQuantum: true,
    steveHershey: true,
    gubernatorial: true,
    marketUpdates: true
  });
  const [frequency, setFrequency] = useState('daily');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subscriptionData = {
        email,
        preferences,
        frequency,
        subscribedAt: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      localStorage.setItem('newsletterSubscription', JSON.stringify(subscriptionData));
      
      setIsSubscribed(true);
      onSubscribe && onSubscribe(subscriptionData);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (pref) => {
    setPreferences(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
  };

  if (isSubscribed) {
    return (
      <div className="newsletter-success">
        <div className="success-icon">✅</div>
        <h3>Successfully Subscribed!</h3>
        <p>You'll receive your first newsletter at the next scheduled update.</p>
        <div className="subscription-details">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Frequency:</strong> {frequency}</p>
          <p><strong>Categories:</strong> {Object.entries(preferences).filter(([_, enabled]) => enabled).map(([key, _]) => key.replace(/([A-Z])/g, ' $1')).join(', ')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-subscription">
      <div className="newsletter-header">
        <h3>📧 Stay Updated</h3>
        <p>Get curated news delivered to your inbox</p>
      </div>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="email-input">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-field"
          />
        </div>

        <div className="frequency-selection">
          <label>Delivery Frequency:</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="frequency-select">
            <option value="daily">Daily (6 AM & 9 AM updates)</option>
            <option value="morning">Morning only (6 AM)</option>
            <option value="weekly">Weekly digest</option>
          </select>
        </div>

        <div className="preferences-section">
          <label>Content Preferences:</label>
          <div className="preferences-grid">
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.marylandCybersecurity}
                onChange={() => handlePreferenceChange('marylandCybersecurity')}
              />
              <span>Maryland Cybersecurity</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.marylandQuantum}
                onChange={() => handlePreferenceChange('marylandQuantum')}
              />
              <span>Maryland Quantum</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.nationalCybersecurity}
                onChange={() => handlePreferenceChange('nationalCybersecurity')}
              />
              <span>National Cybersecurity</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.nationalQuantum}
                onChange={() => handlePreferenceChange('nationalQuantum')}
              />
              <span>National Quantum</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.steveHershey}
                onChange={() => handlePreferenceChange('steveHershey')}
              />
              <span>Steve Hershey</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.gubernatorial}
                onChange={() => handlePreferenceChange('gubernatorial')}
              />
              <span>Gubernatorial Race</span>
            </label>
            <label className="preference-item">
              <input
                type="checkbox"
                checked={preferences.marketUpdates}
                onChange={() => handlePreferenceChange('marketUpdates')}
              />
              <span>Market Updates</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="subscribe-btn"
          disabled={isLoading || !email}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>

      <div className="newsletter-benefits">
        <h4>What you'll get:</h4>
        <ul>
          <li>✅ Curated articles from your preferred sources</li>
          <li>✅ Priority news based on your interests</li>
          <li>✅ Market updates and analysis</li>
          <li>✅ One-click unsubscribe anytime</li>
        </ul>
      </div>
    </div>
  );
};

export default NewsletterSubscription;

