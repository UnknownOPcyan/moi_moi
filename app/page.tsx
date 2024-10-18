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
    async function getUser() {
      const userData = await fetchUser();
      setUser(userData);
    }
    getUser();
  }, []);

  const handleButtonClick1 = () => {
    setButtonStage1('claim');
    setNotification('Button 1 clicked!');
  };

  const handleButtonClick2 = () => {
    setButtonStage2('claim');
    setNotification('Button 2 clicked!');
  };

  const handleButtonClick3 = () => {
    setButtonStage3('claim');
    setNotification('Button 3 clicked!');
  };

  const handleClaim1 = () => {
    setButtonStage1('claimed');
  };

  const handleClaim2 = () => {
    setButtonStage2('claimed');
  };

  const handleClaim3 = () => {
    setButtonStage3('claimed');
  };

  const handleStartFarming = async () => {
    try {
      setIsLoading(true);
      await startFarming(); // Assuming this function starts farming
      setIsFarming(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error starting farming:', error);
      setNotification('An error occurred while starting farming.');
      setIsLoading(false);
    }
  };

  const handleStopFarming = async () => {
    try {
      setIsLoading(true);
      await stopFarming(); // Assuming this function stops farming
      setIsFarming(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error stopping farming:', error);
      setNotification('An error occurred while stopping farming.');
      setIsLoading(false);
    }
  };

  return (
    user && (
      <HomeUI
        user={user}
        buttonStage1={buttonStage1}
        buttonStage2={buttonStage2}
        buttonStage3={buttonStage3}
        isLoading={isLoading}
        notification={notification}
        handleButtonClick1={handleButtonClick1}
        handleButtonClick2={handleButtonClick2}
        handleButtonClick3={handleButtonClick3}
        handleClaim1={handleClaim1}
        handleClaim2={handleClaim2}
        handleClaim3={handleClaim3}
        handleStartFarming={handleStartFarming}
        handleStopFarming={handleStopFarming}
        isFarming={isFarming} // Correctly pass the farming state
        farmingPoints={farmingPoints} // Correctly pass the farming points
      />
    )
  );
}