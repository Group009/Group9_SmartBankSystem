import React, { useEffect } from 'react';
import NotificationService from './NotificationService';

const UnusualActivityNotification = () => {
  useEffect(() => {
    const checkForUnusualActivity = async () => {
      try {
        const unusualActivityDetected = await NotificationService.checkForUnusualActivity();
        if (unusualActivityDetected) {
          // Display a notification or take appropriate action
        }
      } catch (error) {
        console.error('Error checking for unusual activity:', error);
      }
    };

    // Call the checkForUnusualActivity function at regular intervals
    const interval = setInterval(checkForUnusualActivity, 60000); // Every minute

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return <div>Unusual Activity Notification Component</div>;
};

export default UnusualActivityNotification;