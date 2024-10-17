import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toggleUpdateText } from './utils';
import './HomeUI.css';

interface HomeUIProps {
  user: any;
  buttonStage1: 'check' | 'claim' | 'claimed';
  buttonStage2: 'check' | 'claim' | 'claimed';
  buttonStage3: 'check' | 'claim' | 'claimed';
  isLoading: boolean;
  notification: string;
  handleButtonClick1: () => void;
  handleButtonClick2: () => void;
  handleButtonClick3: () => void;
  handleClaim1: () => void;
  handleClaim2: () => void;
  handleClaim3: () => void;
  handleIncreasePoints: (points: number) => void;
}

export default function HomeUI({
  user,
  buttonStage1,
  buttonStage2,
  buttonStage3,
  isLoading,
  notification,
  handleButtonClick1,
  handleButtonClick2,
  handleButtonClick3,
  handleClaim1,
  handleClaim2,
  handleClaim3,
  handleIncreasePoints,
}: HomeUIProps) {
  const [isFarming, setIsFarming] = useState(false);
  const [farmingTime, setFarmingTime] = useState(0);
  const [farmedPixelDogs, setFarmedPixelDogs] = useState(0);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);
    toggleUpdateText();

    let farmingInterval: NodeJS.Timeout;
    if (isFarming) {
      farmingInterval = setInterval(() => {
        setFarmingTime((prevTime) => {
          if (prevTime >= 720) {
            setIsFarming(false);
            return 0;
          }
          return prevTime + 1;
        });
        setFarmedPixelDogs((prev) => prev + (5 / 60));
      }, 1000);
    }

    return () => {
      if (farmingInterval) clearInterval(farmingInterval);
    };
  }, [isFarming]);

  useEffect(() => {
    if (farmingTime % 60 === 0 && farmingTime > 0) {
      handleIncreasePoints(Math.floor(farmedPixelDogs));
      setFarmedPixelDogs(0);
    }
  }, [farmingTime, farmedPixelDogs, handleIncreasePoints]);

  const handleFarmClick = () => {
    if (!isFarming) {
      setIsFarming(true);
      setFarmingTime(0);
      setFarmedPixelDogs(0);
    }
  };

  return (
    <div className="home-container">
      <div className="header-container">
        <div className="dog-image-container">
          <img
            alt="Animated style dog image"
            className="dog-image"
            src="https://storage.googleapis.com/a1aa/image/YlpvEfbklKRiDi8LX5Rww5U3zZZwHEUfju1qUNknpEZ6e2OnA.jpg"
          />
        </div>
        <p id="pixelDogsCount" className="pixel-dogs-count">
          {user.points} PixelDogs
        </p>
        <p id="updateText" className="update-text fade fade-in">
          Exciting updates are on the way:)
        </p>
        <div className="tasks-container">
          <button className="tasks-button">Daily Tasks..!</button>
          <div className="social-container">
            <p className="social-text">Follow Our Youtube!</p>
            <button
              onClick={() => {
                if (buttonStage1 === 'check') {
                  handleButtonClick1();
                } else if (buttonStage1 === 'claim') {
                  handleClaim1();
                }
              }}
              disabled={buttonStage1 === 'claimed' || isLoading}
              className={`claim-button ${
                buttonStage1 === 'claimed' || isLoading ? 'disabled' : ''
              }`}
            >
              {isLoading ? 'Claiming...' : buttonStage1 === 'check' ? 'Check' : buttonStage1 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
          <div className="social-container">
            <p className="social-text">Follow Our Twitter!</p>
            <button
              onClick={() => {
                handleButtonClick2();
                handleClaim2();
              }}
              disabled={buttonStage2 === 'claimed'}
              className="claim-button"
            >
              {buttonStage2 === 'check' ? 'Check' : buttonStage2 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
          <div className="social-container">
            <p className="social-text">Join Our Telegram!</p>
            <button
              onClick={() => {
                handleButtonClick3();
                handleClaim3();
              }}
              disabled={buttonStage3 === 'claimed'}
              className="claim-button"
            >
              {buttonStage3 === 'check' ? 'Check' : buttonStage3 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <button 
        className="farm-button" 
        onClick={handleFarmClick}
        disabled={isFarming}
      >
        {isFarming 
          ? `Farming... ${Math.floor(farmedPixelDogs)} PD` 
          : 'Farm PixelDogs...'}
      </button>
      <div className="footer-container">
        <Link href="/">
          <a className="flex flex-col items-center text-gray-800">
            <i className="fas fa-home text-2xl"></i>
            <p className="text-sm">Home</p>
          </a>
        </Link>
        <Link href="/invite">
          <a className="flex flex-col items-center text-gray-800">
            <i className="fas fa-users text-2xl"></i>
            <p className="text-sm">Friends</p>
          </a>
        </Link>
        <Link href="/wallet">
          <a className="flex flex-col items-center text-gray-800">
            <i className="fas fa-wallet text-2xl"></i>
            <p className="text-sm">Wallet</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
