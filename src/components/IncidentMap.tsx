import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Incident, AidPoint } from '@/types/incident';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IncidentMapProps {
  incidents: Incident[];
  aidPoints?: AidPoint[];
  center?: [number, number];
  zoom?: number;
  showHeatmap?: boolean;
  onIncidentClick?: (incident: Incident) => void;
}

export const IncidentMap: React.FC<IncidentMapProps> = ({
  incidents,
  aidPoints = [],
  center = [12.9716, 77.5946],
  zoom = 13,
  showHeatmap = false,
  onIncidentClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('incident-map').setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add incident markers
    incidents.forEach(incident => {
      const severityColors = {
        critical: '#ef4444',
        high: '#f97316',
        medium: '#eab308',
        low: '#84cc16',
        minimal: '#22c55e',
      };

      const icon = L.divIcon({
        html: `
          <div style="
            background: ${severityColors[incident.severity_level]};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            animation: ${incident.status === 'new' ? 'pulse 2s infinite' : 'none'};
          ">
            <span style="color: white; font-weight: bold; font-size: 12px;">
              ${incident.type.substring(0, 1).toUpperCase()}
            </span>
          </div>
        `,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([incident.lat, incident.lon], { icon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">
              ${incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Emergency
            </h3>
            <p style="margin: 4px 0;"><strong>Status:</strong> ${incident.status}</p>
            <p style="margin: 4px 0;"><strong>Severity:</strong> ${incident.severity_level}</p>
            <p style="margin: 4px 0;"><strong>Address:</strong> ${incident.address}</p>
            ${incident.eta_minutes ? `<p style="margin: 4px 0;"><strong>ETA:</strong> ${incident.eta_minutes} minutes</p>` : ''}
          </div>
        `);

      if (onIncidentClick) {
        marker.on('click', () => onIncidentClick(incident));
      }

      markersRef.current.push(marker);
    });

    // Add aid point markers
    aidPoints.forEach(aidPoint => {
      const aidIcons = {
        hospital: '🏥',
        shelter: '🏠',
        police: '🚓',
        pharmacy: '💊',
        food: '🍽️',
        water: '💧',
      };

      const icon = L.divIcon({
        html: `
          <div style="
            background: #3b82f6;
            width: 24px;
            height: 24px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          ">
            <span style="font-size: 14px;">${aidIcons[aidPoint.type]}</span>
          </div>
        `,
        className: 'aid-point-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([aidPoint.lat, aidPoint.lon], { icon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div>
            <h4 style="margin: 0 0 4px 0; font-weight: bold;">${aidPoint.name}</h4>
            <p style="margin: 2px 0;">Type: ${aidPoint.type}</p>
            <p style="margin: 2px 0;">Hours: ${aidPoint.hours}</p>
            ${aidPoint.distance ? `<p style="margin: 2px 0;">Distance: ${aidPoint.distance} km</p>` : ''}
          </div>
        `);

      markersRef.current.push(marker);
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
        }
        70% {
          box-shadow: 0 0 0 20px rgba(239, 68, 68, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [incidents, aidPoints, center, zoom, onIncidentClick]);

  return <div id="incident-map" className="w-full h-full rounded-lg" />;
};