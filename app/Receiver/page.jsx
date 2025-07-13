"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaGlobeAsia, FaUser, FaEnvelope, FaSignal } from "react-icons/fa";
import { MdAccessTime, MdMergeType } from "react-icons/md";
import useSignalR from "../hooks/useSignalR";
import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("../components/MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

const UserB = () => {
  // states
  const [isClient, setIsClient] = useState(false);
  const [location, setLocation] = useState({ lat: 23.78, lon: 90.4 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [locationName, setLocationName] = useState("Fetching...");
  const [locationType, setLocationType] = useState({});
  const [senderEmail, setSenderEmail] = useState("Waiting for data...");
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // getting extra info
  const locationCategory = locationType?.category;
  const addressType = locationType?.addressType;

  // SignalR listener
  useSignalR((payload) => {
    if (payload?.lat && payload?.lon) {
      setLocation({ lat: payload.lat, lon: payload.lon });
      setLastUpdated(new Date().toLocaleString());
      setSenderEmail(payload.userName || "Unknown user");
      setIsConnected(true);
    }
  });

  // Reverse Geocode whenever lat/lon changes
  useEffect(() => {
    async function getLocationName(lat, lon) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        if (data?.display_name) {
          setLocationName(data.display_name);
          setLocationType(data);
        } else {
          setLocationName("Location name not found");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setLocationName("Failed to fetch");
      }
    }

    if (location.lat && location.lon) {
      getLocationName(location.lat, location.lon);
    }
  }, [location.lat, location.lon]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            📡 Real-Time Location Receiver
          </h1>
          <p className="text-gray-600 text-lg">Viewing shared location data</p>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
                <FaSignal className={`text-xl ${isConnected ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Connection Status</h3>
                <p className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isConnected ? 'Connected - Receiving data' : 'Waiting for connection...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <FaEnvelope className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">From:</span>
              <span className="text-sm text-blue-600 font-semibold">{senderEmail}</span>
            </div>
          </div>
        </div>

        {/* Location Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Location Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <HiOutlineLocationMarker className="text-xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Location Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                  {locationName}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FaGlobeAsia className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Latitude</span>
                  </div>
                  <p className="font-mono text-blue-600 font-semibold">
                    {location.lat.toFixed(6)}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FaGlobeAsia className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Longitude</span>
                  </div>
                  <p className="font-mono text-blue-600 font-semibold">
                    {location.lon.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MdAccessTime className="text-xl text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Status Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MdAccessTime className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Last Updated</span>
                </div>
                <p className="text-gray-800 font-medium">
                  {lastUpdated || "Waiting for update..."}
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MdMergeType className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Location Type</span>
                </div>
                <p className="text-gray-800 font-medium">
                  {locationCategory || addressType ? (
                    <>
                      {locationCategory}
                      {locationCategory && addressType && " / "}
                      {addressType}
                    </>
                  ) : (
                    "Waiting for update..."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaGlobeAsia className="text-xl text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Live Location Map</h3>
          </div>
          
          <div className="rounded-xl overflow-hidden">
            <Map lat={location.lat} lon={location.lon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserB;