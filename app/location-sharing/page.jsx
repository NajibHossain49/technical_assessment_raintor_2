"use client"

import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaMapPin, 
  FaClock, 
  FaSignal, 
  FaEnvelope,
  FaLocationArrow,
  FaMapMarkedAlt
} from 'react-icons/fa';

export default function LocationSender() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [lastSent, setLastSent] = useState(null);
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Simulate SignalR connection
  const sendLocationData = (newLat, newLon, userEmail) => {
    console.log('Sending location:', { lat: newLat, lon: newLon, email: userEmail });
    
    const now = new Date();
    setLastSent(now.toLocaleString());
    setLat(newLat.toFixed(6));
    setLon(newLon.toFixed(6));
    setConnected(true);
  };

  // Get real location
  const getRealLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  // Send location once
  const sendSingleLocation = async () => {
    try {
      const location = await getRealLocation();
      sendLocationData(location.lat, location.lon, email);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Start continuous sharing
  const startSharing = () => {
    if (intervalId) return;
    
    setIsSharing(true);
    sendSingleLocation();
    
    const id = setInterval(() => {
      sendSingleLocation();
    }, 5000);
    
    setIntervalId(id);
  };

  // Stop sharing
  const stopSharing = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsSharing(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      sendSingleLocation();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // If not submitted, show email form
  if (!isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-md w-full">
          <div className="text-center border-b border-gray-100 pb-6 mb-6">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-gray-800">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full text-white">
                <FaUser />
              </div>
              Real-Time Location Sender
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your email to start sharing location
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Start Location Sharing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // After submission, show location controls
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-xl w-full space-y-6">
        <div className="text-center border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-gray-800">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full text-white">
              <FaUser />
            </div>
            Location Sharing Active
          </h2>
          <p className="text-gray-600 mt-2">
            Sharing location for:{" "}
            <span className="font-semibold text-blue-600">{email}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FaMapPin className="text-red-500 text-lg" />
            <div>
              <span className="text-gray-700 font-medium">Latitude:</span>
              <span className="font-mono text-blue-600 ml-2 font-semibold text-lg">
                {lat || "Not set"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMapPin className="text-red-500 text-lg" />
            <div>
              <span className="text-gray-700 font-medium">Longitude:</span>
              <span className="font-mono text-blue-600 ml-2 font-semibold text-lg">
                {lon || "Not set"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationArrow className="text-purple-500 text-lg" />
            <div>
              <span className="text-gray-700 font-medium">Method:</span>
              <span className="text-purple-600 ml-2 font-semibold">
                Real GPS
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <FaClock className="text-lg" />
              <span className="font-medium">Last Sent</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{lastSent || "Not sent yet"}</p>
          </div>

          <div className={`rounded-lg p-4 ${isSharing ? "bg-green-50" : "bg-gray-50"}`}>
            <div className={`flex items-center gap-2 ${isSharing ? "text-green-700" : "text-gray-700"}`}>
              <FaSignal className="text-lg" />
              <span className="font-medium">Status</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {isSharing ? "Sharing continuously" : "Live sharing"}
            </p>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
          <FaMapMarkedAlt />
          View Location on Map
        </button>
      </div>
    </div>
  );
}