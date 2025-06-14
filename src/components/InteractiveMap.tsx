import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
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
  highlightedPropertyId?: string | null;
}

const MarkersComponent: React.FC<{ 
  properties: Property[]; 
  onMarkerClick: (id: string) => void;
  highlightedPropertyId?: string | null;
}> = ({ properties, onMarkerClick, highlightedPropertyId }) => {
  const map = useMap();
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!map) return;

    if (typeof L.markerClusterGroup !== 'function') {
      console.error("L.markerClusterGroup is not a function. Check leaflet.markercluster import.");
      return;
    }

    if (!markerClusterGroupRef.current) {
      markerClusterGroupRef.current = L.markerClusterGroup();
      map.addLayer(markerClusterGroupRef.current);
    }
    
    const mcg = markerClusterGroupRef.current;
    mcg.clearLayers();
    markersRef.current = {}; 

    properties.forEach(property => {
      if (property.lat && property.lng) {
        const marker = L.marker([property.lat, property.lng]);
        marker.bindPopup(`<b>${property.address}</b><br>$${property.price.toLocaleString()} ${property.currency}/month`);
        marker.on('click', (e) => {
          onMarkerClick(property.id);
          L.DomEvent.stopPropagation(e);
        });
        mcg.addLayer(marker);
        markersRef.current[property.id] = marker;
      }
    });

    return () => {
      if (markerClusterGroupRef.current && map && map.hasLayer(markerClusterGroupRef.current)) {
        // map.removeLayer(markerClusterGroupRef.current); // Let's not remove the whole group on property changes, only clear layers.
                                                        // The group itself persists with the map instance.
      }
    };

  }, [properties, map, onMarkerClick]);

  useEffect(() => {
    if (highlightedPropertyId && markersRef.current[highlightedPropertyId] && markerClusterGroupRef.current && map) {
      const marker = markersRef.current[highlightedPropertyId];
      const mcg = markerClusterGroupRef.current;
      
      try {
        // Check if map is still valid before calling operations on it
        if (!map.getContainer()) {
          console.warn("Map container not found, skipping marker highlight effect.");
          return;
        }

        mcg.zoomToShowLayer(marker, () => {
          // Re-check conditions inside the async callback
          if (map && map.getContainer() && markersRef.current[highlightedPropertyId] === marker) {
            if (map.hasLayer(marker)) { // Ensure marker is actually on map (not removed by another process)
               marker.openPopup();
            }
            // Pan to the marker if it's not fully visible after zoom/popup
            if (!map.getBounds().contains(marker.getLatLng())) {
              map.panTo(marker.getLatLng());
            }
          }
        });
      } catch (e) {
        console.error("Error during zoomToShowLayer or its callback:", e);
      }
    }
  }, [highlightedPropertyId, map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties, onMarkerClick, highlightedPropertyId }) => {
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
        highlightedPropertyId={highlightedPropertyId} 
      />
    </MapContainer>
  );
};

export default InteractiveMap;