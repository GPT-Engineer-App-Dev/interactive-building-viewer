import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const Index = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Generate 10 random markers within Oslo's approximate bounding box
    const osloBounds = {
      minLat: 59.8,
      maxLat: 60.1,
      minLng: 10.5,
      maxLng: 10.9,
    };

    const generateRandomMarkers = (bounds, count) => {
      const markers = [];
      for (let i = 0; i < count; i++) {
        const lat = Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat;
        const lng = Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng;
        markers.push({ id: i, lat, lng });
      }
      return markers;
    };

    setMarkers(generateRandomMarkers(osloBounds, 10));
  }, []);

  const icon = new L.Icon({
    iconUrl: require('../assets/pin-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map(marker => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={icon}>
          <Popup>
            <Box>
              <Text fontWeight="bold">Building {marker.id + 1}</Text>
              <Text>Temperature: {Math.random() * 10 + 18}°C</Text>
              <Text>Humidity: {Math.random() * 50 + 30}%</Text>
              <Text>Occupancy: {Math.floor(Math.random() * 10) + 1} people</Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;