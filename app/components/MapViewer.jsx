"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-200 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapWrapper({ lat, lon }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-[500px] w-full bg-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <Map lat={lat} lon={lon} />;
}
