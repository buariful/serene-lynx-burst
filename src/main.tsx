import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css'; // Temporarily removed
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Temporarily removed

createRoot(document.getElementById("root")!).render(<App />);