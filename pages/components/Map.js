import { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import L from 'leaflet';

const MapComponent = ({ pickupCoordinates, dropoffCoordinates }) => {
  useEffect(() => {
    // Create a new map instance
    const map = L.map('map').setView([39.39172, -99.29011], 3);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to add markers to the map
    const addToMap = (coordinates) => {
      L.marker([coordinates[1], coordinates[0]]).addTo(map);
    };

    // Add pickup and dropoff markers
    if (pickupCoordinates) addToMap(pickupCoordinates);
    if (dropoffCoordinates) addToMap(dropoffCoordinates);

    // Fit map bounds to include both markers
    if (pickupCoordinates && dropoffCoordinates) {
      const bounds = L.latLngBounds([
        [pickupCoordinates[1], pickupCoordinates[0]],
        [dropoffCoordinates[1], dropoffCoordinates[0]]
      ]);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  return <Wrapper id="map"></Wrapper>;
};

export default MapComponent;

const Wrapper = tw.div`
  flex-1 h-1/2
`;
