import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import EditButton from './Edit';

const customSVGIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
`;

const customIcon = L.divIcon({
  className: 'custom-icon-class',
  html: customSVGIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface MineData {
  State: string;
  District: string;
  MineName: string;
  MineProd: string;
  MineOwner: string;
  "Coal Mine Owner Full Name": string;
  "Govt Owned/Private": string;
  "Type of Mine (OC/UG/Mixed)": string;
  Latitude: string;
  Longitude: string;
  Source: string;
}

interface SidingData {
  Siding: string;
  Status: string;
  Latitude: string;
  Longitude: string;
  "Company Name": string;
  Train: string;
  Start_Time: string;
  End_Time: string;
}

const positions: [number, number][] = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.49, -0.08],
];

const Map: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(positions[0]);
  const [allMines, setMines] = useState<SidingData[]>([]);

  const getMines = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-sidings');
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching mines:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const minesData = await getMines();
        const data = minesData.response;
        setMines(data);
        setMapCenter(positions[0]);
      } catch (error) {
        console.error("Error occurred", error);
      }
    };

    fetchData();
  }, []);
  console.log("Hello World")

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
        <link href="https://cdn.tailwindcss.com" rel="stylesheet"></link>
        <style>
          {`
            * {
            }
          `}
        </style>
      </Helmet>

      <MapContainer center={[17.6868, 83.2185]} zoom={7} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allMines.map((mine, index) => (
          <Marker
            key={index}
            position={[parseFloat(mine.Latitude), parseFloat(mine.Longitude)]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <strong>Sidings:</strong> {mine.Siding}
              </div>
              <div>
                <strong>Status:</strong> {mine.Status} tones
              </div>
              <div>
                <strong>Latitude:</strong> {mine.Latitude}
              </div>
              <div>
                <strong>Company Name:</strong> {mine["Company Name"]}
              </div>
              <div>
                <strong>Train:</strong> {mine.Train}
              </div>
              <div>
                <strong>Start_Time:</strong> {mine.Start_Time}
              </div>
              <div>
                <strong>End_Time:</strong> {mine.End_Time}
              </div>
              <div>
                <EditButton />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
