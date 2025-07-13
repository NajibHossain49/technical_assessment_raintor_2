"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaMapPin,
  FaHistory,
  FaClock,
  FaSignal,
  FaPaperPlane,
  FaMapMarkedAlt,
  FaEnvelope,
} from "react-icons/fa";
import useSignalR from "../hooks/useSignalR";

export default function Page() {
  const [lat, setLat] = useState("Generating...");
  const [lon, setLon] = useState("Generating...");
  const [lastSent, setLastSent] = useState(null);
  const [history, setHistory] = useState([]);
  const [autoSend, setAutoSend] = useState(true);
  const [connected, setConnected] = useState(false);
  const [mapBtn, setMapBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  // initializing signalR
  const { sendLatLon } = useSignalR(() => {}, setConnected);

  // email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsEmailSubmitted(true);
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  // lat, lon sending function
  const sendNow = () => {
    // random location in dhaka
    const newLat = 23.78 + Math.random() * 0.01;
    const newLon = 90.4 + Math.random() * 0.01;

    sendLatLon(newLat, newLon, email);

    const now = new Date();
    setLastSent(now.toLocaleString());
    setLat(newLat.toFixed(6));
    setLon(newLon.toFixed(6));

    // setting data in history for showing last one history
    setHistory((prev) => {
      const updated = [
        { lat: newLat, lon: newLon, time: now.toLocaleTimeString() },
      ];
      return updated.slice(0, 1);
    });
  };

  // auto send data
  useEffect(() => {
    if (!autoSend || !isEmailSubmitted) return;
    const interval = setInterval(() => {
      setConnected(true);
      setMapBtn(true);
      sendNow();
    }, 3000);
    return () => clearInterval(interval);
  }, [autoSend, isEmailSubmitted, email]);

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 transform transition-all hover:scale-[1.02]">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-700">
          <FaUser className="text-indigo-500" /> Location Tracker
        </h2>

        {!isEmailSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-indigo-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FaPaperPlane /> Submit Email
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-indigo-500" />
              <span className="text-gray-700">{email}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaMapPin className="text-red-500" />
              <span className="font-medium">Latitude:</span>
              <span className="font-mono text-gray-700">{lat}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaMapPin className="text-red-500" />
              <span className="font-medium">Longitude:</span>
              <span className="font-mono text-gray-700">{lon}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaClock className="text-blue-500" />
              <span className="font-medium">Last Sent:</span>
              <span className="text-gray-700">{lastSent || "Not yet sent"}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaSignal className={connected ? "text-green-500" : "text-red-500"} />
              <span className="font-medium">Status:</span>
              <span className="text-gray-700">{connected ? "Connected" : "Disconnected"}</span>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSend}
                onChange={(e) => setAutoSend(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              Auto Send
            </label>

            {!autoSend && (
              <button
                onClick={sendNow}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaPaperPlane /> Send Now
              </button>
            )}

            <div className="mt-6">
              <h4 className="text-md font-semibold flex items-center gap-2 mb-3 text-gray-800">
                <FaHistory className="text-gray-600" />
                Last Sent Location:
              </h4>
              <ul className="list-disc ml-6 text-sm text-gray-600">
                {history.length === 0 ? (
                  <li>No history yet</li>
                ) : (
                  history.map((item, i) => (
                    <li key={i}>
                      {item.lat.toFixed(6)}, {item.lon.toFixed(6)} — {item.time}
                    </li>
                  ))
                )}
              </ul>
            </div>

            {mapBtn && (
              <Link
                target="_blank"
                href="/Receiver"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaMapMarkedAlt /> View Location on Map
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}