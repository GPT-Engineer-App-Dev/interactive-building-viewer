import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';

// Dummy data for buildings
const buildings = [
  { id: 1, lat: 59.9139, lng: 10.7522, temp: '21°C', humidity: '55%', occupancy: '35 people' },
  { id: 2, lat: 59.9149, lng: 10.7622, temp: '19°C', humidity: '60%', occupancy: '28 people' },
  // Add 8 more buildings with random coordinates within Oslo
];

// Custom pin icon
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const MapWithPins = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map(building => (
        <Marker
          key={building.id}
          position={[building.lat, building.lng]}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        />
      ))}
      {activeBuilding && (
        <Popup
          position={[activeBuilding.lat, activeBuilding.lng]}
          onClose={() => {
            setActiveBuilding(null);
          }}
        >
          <VStack>
            <Text fontWeight="bold">Building Info</Text>
            <Box>
              <Text>Temperature: {activeBuilding.temp}</Text>
              <Text>Humidity: {activeBuilding.humidity}</Text>
              <Text>Occupancy: {activeBuilding.occupancy}</Text>
            </Box>
          </VStack>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapWithPins;