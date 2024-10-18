"use client"; // This ensures the component is treated as a Client Component

import React, { useState, useEffect } from 'react';
import HomeUI from './HomeUI'; // Ensure correct import path
import { fetchUser, startFarming, stopFarming } from './api'; // Import your API functions

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [buttonStage1, setButtonStage1] = useState<'check' | 'claim' | 'claimed'>('check');
  const [buttonStage2, setButtonStage2] = useState<'check' | 'claim' | 'claimed'>('check');
  const [buttonStage3, setButtonStage3] = useState<'check' | 'claim' | 'claimed'>('check');
  const [isFarming, setIsFarming] = useState(false);
  const [farmingPoints, setFarmingPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleStartFarming = async () => {
    try {
      const response = await startFarming();
      if (response.success) {
        setIsFarming(true);
        setNotification('Farming started!');
      } else {
        setNotification('Error starting farming.');
      }
    } catch (error) {
      console.error('Error starting farming:', error);
      setNotification('An error occurred while starting farming.');
    }
  };

  const handleStopFarming = async () => {
    try {
      const response = await stopFarming();
      if (response.success) {
        setFarmingPoints(response.farmedAmount);
        setIsFarming(false);
        setNotification('Farming stopped!');
      } else {
        setNotification('Error stopping farming.');
      }
    } catch (error) {
      console.error('Error stopping farming:', error);
      setNotification('An error occurred while stopping farming.');
    }
  };

  return (
    <HomeUI
      user={user}
      buttonStage1={buttonStage1}
      buttonStage2={buttonStage2}
      buttonStage3={buttonStage3}
      isLoading={isLoading}
      notification={notification}
      isFarming={isFarming}
      farmingPoints={farmingPoints}
      handleButtonClick1={() => setButtonStage1('claim')}
      handleButtonClick2={() => setButtonStage2('claim')}
      handleButtonClick3={() => setButtonStage3('claim')}
      handleClaim1={() => setButtonStage1('claimed')}
      handleClaim2={() => setButtonStage2('claimed')}
      handleClaim3={() => setButtonStage3('claimed')}
      handleStartFarming={handleStartFarming}
      handleStopFarming={handleStopFarming}
    />
  );
}