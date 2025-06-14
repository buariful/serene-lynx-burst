import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Property } from '@/types/property';

// Fix leaflet's default icon path issue often seen with bundlers like Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface InteractiveMapProps {
  properties: Property[];
  onMarkerClick: (id: string) => void;
  highlightedPropertyId?: string | null; // Optional: for future use if card hover highlights marker
}

const MarkersComponent: React.FC<{ properties: Property[]; onMarkerClick: (id: string) => void }> = ({ properties, onMarkerClick }) => {
  const map = useMap();
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    // Initialize marker cluster group
    if (!markerClusterGroupRef.current) {
      markerClusterGroupRef.current = L.markerClusterGroup();
      map.addLayer(markerClusterGroupRef.current);
    }
    
    const mcg = markerClusterGroupRef.current;
    mcg.clearLayers(); // Clear existing markers before adding new ones

    properties.forEach(property => {
      if (property.lat && property.lng) {
        const marker = L.marker([property.lat, property.lng]);
        marker.bindPopup(`<b>${property.address}</b><br>$${property.price.toLocaleString()} ${property.currency}/month`);
        marker.on('click', (e) => {
          onMarkerClick(property.id);
          L.DomEvent.stopPropagation(e); // Prevent map click event
        });
        mcg.addLayer(marker);
      }
    });

    // Note: We don't remove the cluster group on cleanup if map persists,
    // only clear its layers. If map itself is unmounted, it's handled.

  }, [properties, map, onMarkerClick]);

  return null; // Markers are added directly to the map instance via the effect
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties, onMarkerClick, highlightedPropertyId }) => {
  const defaultPosition: L.LatLngExpression = [43.6532, -79.3832]; // Toronto coordinates

  // TODO: Implement logic to highlight a specific marker based on highlightedPropertyId if needed

  return (
    <MapContainer 
        center={defaultPosition} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', border: 'none', outline: 'none' }}
        className="interactive-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersComponent properties={properties} onMarkerClick={onMarkerClick} />
    </MapContainer>
  );
};

export default InteractiveMap;