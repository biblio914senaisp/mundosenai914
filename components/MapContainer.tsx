
import React from 'react';
import type { Coordinates } from '../types';

interface MapContainerProps {
  center: Coordinates;
}

const MapContainer: React.FC<MapContainerProps> = ({ center }) => {
  const mapSrc = `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=18&output=embed&t=k`; // t=k for satellite view

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <iframe
        title="map"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapContainer;
