"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { LocationData } from "../types";

// Main HUB URL
const SIGNALR_URL = "https://tech-test.raintor.com/Hub";

interface UseSignalROptions {
  userName: string;
}

interface UseSignalRReturn {
  connection: HubConnection | null;
  isConnected: boolean;
  lastReceivedLocation: LocationData | null;
  sendLocation: (lat: number, lon: number) => Promise<void>;
  connectionError: Error | null;
}

export const useSignalR = ({ userName }: UseSignalROptions): UseSignalRReturn => {
  // React state variables to track connection status and data
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastReceivedLocation, setLastReceivedLocation] = useState<LocationData | null>(null);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  
  // Using refs to persist values between renders and avoid dependency issues
  const connectionRef = useRef<HubConnection | null>(null);
  const userNameRef = useRef<string>(userName);

  // Safely disconnect and clean up any existing SignalR connection
  const stopExistingConnection = async () => {
    if (connectionRef.current) {
      console.log("Stopping existing connection");
      await connectionRef.current.stop();
      connectionRef.current = null;
      setConnection(null);
      setIsConnected(false);
    }
  };

  // Creates a new SignalR connection with WebSocket transport and auto-reconnect
  const createConnectionBuilder = () => {
    return new HubConnectionBuilder()
      .withUrl(SIGNALR_URL, {
        withCredentials: false, 
        skipNegotiation: true, 
        transport: 1,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  };

  // Registers event handlers for different connection states and incoming messages
  const setupConnectionHandlers = (newConnection: HubConnection) => {
    // Listen for location updates from other users
    newConnection.on("ReceiveLatLon", (locationData: LocationData) => {
      console.log("Received location update:", locationData);
      setLastReceivedLocation(locationData);
    });

    // Handle reconnection attempts
    newConnection.onreconnecting(() => {
      console.log("SignalR attempting to reconnect...");
      setIsConnected(false);
    });

    // Handle successful reconnection
    newConnection.onreconnected(() => {
      console.log("SignalR reconnected");
      setIsConnected(true);
      setConnectionError(null);
    });

    // Handle connection closure
    newConnection.onclose(() => {
      console.log("SignalR connection closed");
      setIsConnected(false);
    });
  };

  // Updates all connection-related state when connection is established
  const updateConnectionState = (newConnection: HubConnection) => {
    connectionRef.current = newConnection;
    setConnection(newConnection);
    setIsConnected(true);
    setConnectionError(null);
  };

  // Handles any errors that occur during connection establishment
  const handleConnectionError = (error: unknown) => {
    console.error("Error establishing SignalR connection:", error);
    setConnectionError(error instanceof Error ? error : new Error(String(error)));
    setIsConnected(false);
    connectionRef.current = null;
  };

  // Main function that orchestrates the entire connection process
  const createConnection = async () => {
    try {
      console.log("Creating SignalR connection with username:", userName);

      await stopExistingConnection();

      const newConnection = createConnectionBuilder();
      setupConnectionHandlers(newConnection);

      await newConnection.start();
      console.log("SignalR connection established");

      updateConnectionState(newConnection);
    } catch (error) {
      handleConnectionError(error);
    }
  };

  // Determines whether a new connection should be created based on current state
  const shouldCreateConnection = () => {
    if (!userName) {
      console.log("Skipping SignalR connection - username is empty");
      return false;
    }

    if (userName === userNameRef.current && connectionRef.current) {
      console.log("Username unchanged and connection exists, skipping reconnect");
      return false;
    }

    return true;
  };

  // Effect hook that manages connection lifecycle based on username changes
  useEffect(() => {
    if (!shouldCreateConnection()) {
      return;
    }

    userNameRef.current = userName;
    createConnection();

    // Cleanup function to properly close connection when component unmounts
    return () => {
      if (connectionRef.current) {
        console.log("Cleanup: stopping connection");
        connectionRef.current
          .stop()
          .catch((err: any) => console.error("Error stopping connection:", err));
        connectionRef.current = null;
      }
    };
  }, [userName]);

  // Validates that all required conditions are met before sending location
  const validateSendLocationInputs = () => {
    if (!userName) {
      throw new Error("Username is required to send location");
    }

    if (!connectionRef.current) {
      throw new Error("SignalR connection has not been created");
    }

    if (!isConnected) {
      throw new Error("SignalR connection is not in the Connected state");
    }
  };

  // Ensures the connection is active and ready to send data
  const ensureConnectionReady = async () => {
    if (connectionRef.current!.state !== "Connected") {
      console.warn("Connection state is not 'Connected', attempting to reconnect...");
      await connectionRef.current!.start();
      setIsConnected(true);
      console.log("Connection reestablished");
    }
  };

  // Sends location data to the SignalR hub and updates local state
  const sendLocationData = async (lat: number, lon: number) => {
    await connectionRef.current!.invoke("SendLatLon", lat, lon, userName);
    console.log("Location sent successfully");

    // Update local state so we can see our own location immediately
    const ownLocation: LocationData = { userName, lat, lon };
    setLastReceivedLocation(ownLocation);
  };

  // Public function to send location updates with comprehensive error handling
  const sendLocation = useCallback(
    async (lat: number, lon: number) => {
      try {
        validateSendLocationInputs();
        await ensureConnectionReady();
        await sendLocationData(lat, lon);
      } catch (error) {
        console.error("Error sending location:", error);
        throw error;
      }
    },
    [isConnected, userName]
  );

  return {
    connection,
    isConnected,
    lastReceivedLocation,
    sendLocation,
    connectionError,
  };
};