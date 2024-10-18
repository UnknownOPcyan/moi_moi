import { useState, useEffect } from 'react';

const HomeUI = ({ user, setUser }) => {
    const [isFarming, setIsFarming] = useState(false); // Track farming status
    const [countdown, setCountdown] = useState(60); // Countdown for farming duration
    const [farmedPoints, setFarmedPoints] = useState(0); // Accumulated farming points
    const [claimable, setClaimable] = useState(false); // Track if points can be claimed

    // Function to start farming process
    const startFarming = async () => {
        if (!user) return; // Prevent if user isn't loaded

        setIsFarming(true); // Set farming to active
        setClaimable(false); // Reset claim status
        setCountdown(60); // Reset countdown
        setFarmedPoints(0); // Reset farmed points

        // API call to start farming
        await fetch('/api/start-farming', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramId: user.telegramId, action: 'start' }),
        });

        // Farming progress: increment points every second and countdown
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1); // Decrease countdown
            setFarmedPoints((prev) => Math.min(3, (prev + 0.05).toFixed(2))); // Increment points by 0.05/sec
        }, 1000);

        // After 60 seconds, allow claiming
        setTimeout(() => {
            clearInterval(interval); // Stop farming
            setIsFarming(false); // Reset farming status
            setClaimable(true); // Set claimable to true
        }, 60000); // 1 minute duration
    };

    // Function to claim farmed points
    const claimPoints = async () => {
        if (!user) return; // Prevent if user isn't loaded

        // API call to claim farmed points
        const res = await fetch('/api/start-farming', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramId: user.telegramId, action: 'claim' }),
        });
        const data = await res.json();

        if (data.success) {
            setClaimable(false); // Reset claimable status
            setUser({ ...user, points: data.points }); // Update user's total points
        }
    };

    return (
        <div>
            <button
                onClick={isFarming ? null : claimable ? claimPoints : startFarming} // Button logic
                disabled={isFarming} // Disable button during farming
                className={isFarming ? 'disabled-button' : 'active-button'} // Style based on farming status
            >
                {isFarming
                    ? `${farmedPoints} PxDogs (${countdown}s)`  // Show farming progress
                    : claimable
                    ? 'Claim 3 PixelDogs' // Show claim button after farming
                    : 'Farm PixelDogs'} // Default button text
            </button>

            {/* Display user's total points */}
            <div>Total Points: {user.points}</div>
        </div>
    );
};

export default HomeUI;