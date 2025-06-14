import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
// import 'leaflet.markercluster'; // Temporarily removed
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Property } from '@/types/property';

// Fix leaflet's default icon path issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface InteractiveMapProps {
  properties: Property[];
  onMarkerClick: (id: string) => void;
}

const MarkersComponent: React.FC<{ 
  properties: Property[]; 
  onMarkerClick: (id: string) => void;
}> = ({ properties, onMarkerClick }) => {
  const map = useMap();
  const layerGroupRef = useRef<L.LayerGroup | null>(null); // Using a simple LayerGroup for markers
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Initialize a LayerGroup if it doesn't exist and add to map
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup();
      map.addLayer(layerGroupRef.current);
    }
    
    const lg = layerGroupRef.current;
    lg.clearLayers(); // Clear previous markers

    properties.forEach(property => {
      if (property.lat && property.lng) {
        const marker = L.marker([property.lat, property.lng]);
        marker.bindPopup(`<b>${property.address}</b><br>$${property.price.toLocaleString()} ${property.currency}/month`);
        marker.on('click', (e) => {
          if (isMountedRef.current) {
            onMarkerClick(property.id);
          }
          L.DomEvent.stopPropagation(e);
        });
        lg.addLayer(marker); // Add marker to the LayerGroup
      }
    });

  }, [properties, map, onMarkerClick]);

  // Cleanup effect for the LayerGroup
  useEffect(() => {
    const lg = layerGroupRef.current;
    return () => {
      if (lg && map && map.hasLayer(lg)) {
        map.removeLayer(lg);
        layerGroupRef.current = null;
        console.log("Marker LayerGroup removed from map on unmount");
      }
    };
  }, [map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties, onMarkerClick }) => {
  const defaultPosition: L.LatLngExpression = [43.6532, -79.3832]; // Toronto

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
      <MarkersComponent 
        properties={properties} 
        onMarkerClick={onMarkerClick}
      />
    </MapContainer>
  );
};

export default InteractiveMap;