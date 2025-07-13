"use client";
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { HttpTransportType } from "@microsoft/signalr";

const useSignalR = (receiveLatLon) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    // Skip if running on server side
    if (typeof window === "undefined") return;

    // Determine hub URL based on environment
    const isProd = window.location.hostname !== "localhost";
    const hubUrl = isProd
      ? "https://tech-test.raintor.com/Hub"
      : "/api/signalr";

    // Create SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    // Start connection and set up message listener
    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
        // Listen for incoming lat/lon messages
        connection.on("receiveLatLon", receiveLatLon);
        connectionRef.current = connection;
      })
      .catch((err) => {
        console.error("Failed to connect:", err);
      });

    // Handle connection events
    connection.onclose((err) => {
      console.warn("SignalR disconnected", err);
    });

    connection.onreconnecting((err) => {
      console.warn("SignalR reconnecting...", err);
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
    });

    // Cleanup on component unmount
    return () => {
      if (connection) connection.stop();
    };
  }, [receiveLatLon]);

  // Send lat/lon data to hub
  const sendLatLon = (lat, lon, userName) => {
    if (connectionRef.current) {
      connectionRef.current.invoke("sendLatLon", lat, lon, userName);
    }
  };

  return { sendLatLon };
};

export default useSignalR;
