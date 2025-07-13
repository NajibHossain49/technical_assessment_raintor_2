"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (map && lat && lon) {
      map?.setView([lat, lon], map?.getZoom());
    }
  }, [lat, lon, map]);

  return null;
};

export default function MapComponent({ lat, lon }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: icon?.options.iconRetinaUrl,
      iconUrl: icon?.options.iconUrl,
      shadowUrl: icon?.options.shadowUrl,
    });
  }, []);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>Live Location</Popup>
      </Marker>
      <RecenterMap lat={lat} lon={lon} />
    </MapContainer>
  );
}
