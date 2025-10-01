import React, { useState, useEffect } from 'react';
import './UpdateSchedule.css';

const UpdateSchedule = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextUpdate, setNextUpdate] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    let nextUpdateTime = null;

    // Check for morning update (6:00 AM)
    if (currentTimeString < '06:00') {
      nextUpdateTime = {
        time: '06:00',
        type: 'Morning News',
        description: 'Daily briefing with overnight developments',
        hours: 6 - currentHour,
        minutes: 0 - currentMinute
      };
    }
    // Check for market update (9:00 AM)
    else if (currentTimeString < '09:00') {
      nextUpdateTime = {
        time: '09:00',
        type: 'Market Update',
        description: 'Business news and market developments',
        hours: 9 - currentHour,
        minutes: 0 - currentMinute
      };
    }
    // Next day's morning update
    else {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(6, 0, 0, 0);
      
      const timeDiff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      nextUpdateTime = {
        time: '06:00',
        type: 'Morning News',
        description: 'Daily briefing with overnight developments',
        hours,
        minutes
      };
    }

    setNextUpdate(nextUpdateTime);
  }, [currentTime]);

  const formatTimeUntilUpdate = (hours, minutes) => {
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getUpdateStatus = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    // Check if we're in update window (within 30 minutes of scheduled time)
    const isMorningWindow = currentHour === 6 && currentMinute < 30;
    const isMarketWindow = currentHour === 9 && currentMinute < 30;
    
    if (isMorningWindow) {
      return { status: 'updating', message: 'Morning news update in progress...' };
    } else if (isMarketWindow) {
      return { status: 'updating', message: 'Market update in progress...' };
    } else {
      return { status: 'waiting', message: 'Waiting for next update' };
    }
  };

  const updateStatus = getUpdateStatus();

  return (
    <div className="update-schedule">
      <div className="schedule-header">
        <h3>📅 Update Schedule</h3>
        <div className={`status-indicator ${updateStatus.status}`}>
          <span className="status-dot"></span>
          {updateStatus.message}
        </div>
      </div>

      <div className="schedule-grid">
        <div className="schedule-item">
          <div className="schedule-time">6:00 AM</div>
          <div className="schedule-type">Morning News</div>
          <div className="schedule-desc">Daily briefing with overnight developments</div>
        </div>

        <div className="schedule-item">
          <div className="schedule-time">9:00 AM</div>
          <div className="schedule-type">Market Update</div>
          <div className="schedule-desc">Business news and market developments</div>
        </div>
      </div>

      {nextUpdate && (
        <div className="next-update">
          <div className="next-update-header">
            Next Update: {nextUpdate.time} ({nextUpdate.type})
          </div>
          <div className="countdown">
            {formatTimeUntilUpdate(nextUpdate.hours, nextUpdate.minutes)}
          </div>
        </div>
      )}

      <div className="current-time">
        Current Time: {currentTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })}
      </div>
    </div>
  );
};

export default UpdateSchedule;

