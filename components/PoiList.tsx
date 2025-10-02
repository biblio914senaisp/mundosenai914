
import React from 'react';
import type { PointOfInterest, Coordinates } from '../types';

interface PoiListProps {
  pois: PointOfInterest[];
  visitedPoiIds: string[];
  userLocation: Coordinates | null;
  haversineDistance: (coords1: Coordinates, coords2: Coordinates) => number;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PoiList: React.FC<PoiListProps> = ({ pois, visitedPoiIds, userLocation, haversineDistance }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Pontos de Interesse</h2>
      <ul className="space-y-4">
        {pois.map((poi) => {
          const isVisited = visitedPoiIds.includes(poi.id);
          const distance = userLocation ? haversineDistance(userLocation, poi.coords) : null;
          
          return (
            <li key={poi.id} className={`p-4 rounded-lg transition-all duration-300 ${isVisited ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{poi.name}</h3>
                  <p className="text-sm text-gray-500">{poi.description}</p>
                </div>
                {isVisited && <CheckIcon />}
              </div>
              {userLocation && distance !== null && (
                 <p className={`text-sm font-semibold mt-2 ${distance < 20 ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`}>
                    {distance.toFixed(0)} metros de distância
                 </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PoiList;
