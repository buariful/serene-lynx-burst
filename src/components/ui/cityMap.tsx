import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L, {
  Map as LeafletMap,
  Marker as LeafletMarker,
  GeoJSON as LeafletGeoJSON,
  MapOptions,
  LatLngBounds,
  LeafletEvent,
} from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// --- Type Augmentation for Leaflet Marker ---
// This tells TypeScript that our L.Marker instances can have a 'customData' property.
declare module "leaflet" {
  interface Marker {
    customData?: {
      title: string;
      imageUrl: string;
    };
  }
}

// Boundary for Vancouver
const vancouverBoundary: {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
} = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-123.25, 49.2],
        [-123.05, 49.2],
        [-123.05, 49.3],
        [-123.25, 49.3],
        [-123.25, 49.2],
      ],
    ],
  },
};

// Inline type for torontoBoundary
const torontoBoundary: {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
} = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-79.6393, 43.581],
        [-79.1152, 43.581],
        [-79.1152, 43.8555],
        [-79.6393, 43.8555],
        [-79.6393, 43.581],
      ],
    ],
  },
};



// Custom square money markers
const createMoneySquareMarker = (amount: number) => {
  return L.divIcon({
    html: `
    <div style="position:">
    <div style="background-color:#2563eb; border-radius:4px; width:64px; height:30px; display:flex; align-items:center;  justify-content:center; color:#fff;  font-size:14px; border:2px solid #2563eb;">$${amount} </div>
    <span style="position:absolute; content:''; height:10px; width:10px; background:#2563eb; bottom: 5px; left: 50%; transform: translateX(-2px); rotate: 45deg"></span>
    </div>
    `,
    className: "money-square-marker",
    iconSize: [64, 40],
  });
};

const MapLogic = () => {
  const map = useMap();
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    markerClusterRef.current = L.markerClusterGroup({
      zoomToBoundsOnClick: false,
    });
    const allMarkerPoints: L.LatLng[] = [];

    // Create 300 square money markers with random prices
    for (let i = 1; i <= 300; i++) {
      const lat = 49.2827 + (Math.random() - 0.5) * 0.02;
      const lng = -123.1207 + (Math.random() - 0.5) * 0.03;
      const amount = Math.floor(300 + Math.random() * 8000);
      const markerData = {
        title: `Rental Price: $${amount}`,
        imageUrl: `https://picsum.photos/id/${i}/50/50`,
      };

      allMarkerPoints.push(L.latLng(lat, lng));
      const icon = createMoneySquareMarker(amount);
      const leafletMarker = L.marker([lat, lng], { icon }).bindPopup(
        `<a href="/toronto/2"><b>${markerData.title}</b><br/><img src="${markerData.imageUrl}" style="width:50px; height:50px; border-radius:4px; margin-top:5px;" /></a>`
      );
      leafletMarker.customData = markerData;
      markerClusterRef.current.addLayer(leafletMarker);
    }

    // Custom cluster click handler to show a list of items
    markerClusterRef.current.on("clusterclick", (a) => {
      const childMarkers = a.layer.getAllChildMarkers();
      let popupContent =
        '<div style="max-height: 200px; overflow-y: auto; padding-right: 10px;"><ul>';

      childMarkers.forEach((marker) => {
        const data = marker.customData;
        if (data) {
          popupContent += `
            <li style=" margin-bottom: 8px; list-style: none;">
              <a href="/toronto/2" style="display: flex; align-items: center;"><img src="${data.imageUrl}" width="40" height="40" style="margin-right: 10px; border-radius: 4px;" alt="${data.title}" />
              <span style="font-family: sans-serif; font-size: 14px;">${data.title}</span></a>
            </li>
          `;
        }
      });

      popupContent += "</ul></div>";

      L.popup()
        .setLatLng(a.layer.getLatLng())
        .setContent(popupContent)
        .openOn(map);
    });

    map.addLayer(markerClusterRef.current);

    // Fit map to show all markers without boundary
    if (markerClusterRef.current) {
      map.fitBounds(markerClusterRef.current.getBounds());
    }

    return () => {
      if (markerClusterRef.current) {
        map.removeLayer(markerClusterRef.current);
      }
    };
  }, [map]);

  return null;
};

const CityMap = () => {
  return (
    <MapContainer
      center={[49.2827, -123.1207]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      className="dark:bg-[hsl(var(--background))]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapLogic />
    </MapContainer>
  );
};

// Map with no markers or boundaries for public property details page
export const CityMapNoMarker = () => {
  return (
    <MapContainer
      center={[49.2827, -123.1207]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      className="dark:bg-[hsl(var(--background))]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default CityMap;
