import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './TaskUI.css';

interface HomeUIProps {
  user: any;
  buttonStage1: 'check' | 'claim' | 'claimed';
  buttonStage2: 'check' | 'claim' | 'claimed';
  buttonStage3: 'check' | 'claim' | 'claimed';
  isLoading: boolean;
  notification: string;
  handleButtonClick4: () => void;
  handleButtonClick5: () => void;
  handleButtonClick6: () => void;
  handleClaim4: () => void;
  handleClaim5: () => void;
  handleClaim6: () => void;
}

export default function HomeUI({
  user,
  buttonStage1,
  buttonStage2,
  buttonStage3,
  isLoading,
  notification,
  handleButtonClick4,
  handleButtonClick5,
  handleButtonClick6,
  handleClaim4,
  handleClaim5,
  handleClaim6,
}: HomeUIProps) {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);
  }, []);

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
                  handleButtonClick4();
                } else if (buttonStage1 === 'claim') {
                  handleClaim4();
                }
              }}
              disabled={buttonStage1 === 'claimed' || isLoading}
              className={`claim-button ${
                buttonStage1 === 'claimed' || isLoading ? 'disabled' : ''
              }`}
            >
              {isLoading ? 'Claiming...' : buttonStage1 === 'check' ? '100' : buttonStage1 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
          <div className="social-container">
            <p className="social-text">Follow Our Twitter!</p>
            <button
              onClick={() => {
                handleButtonClick5();
                handleClaim5();
              }}
              disabled={buttonStage2 === 'claimed'}
              className="claim-button"
            >
              {buttonStage2 === 'check' ? '150' : buttonStage2 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
          <div className="social-container">
            <p className="social-text">Join Our Telegram!</p>
            <button
              onClick={() => {
                handleButtonClick6();
                handleClaim6();
              }}
              disabled={buttonStage3 === 'claimed'}
              className="claim-button"
            >
              {buttonStage3 === 'check' ? '300' : buttonStage3 === 'claim' ? 'Claim' : 'Claimed'}
            </button>
          </div>
        </div>
      </div>
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
        <Link href="/task">
          <a className="flex flex-col items-center text-gray-800">
            <i className="fas fa-clipboard text-2xl"></i>
            <p className="text-sm">Taskst</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
