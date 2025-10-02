
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Coordinates, Item, PointOfInterest } from './types';
import { POINTS_OF_INTEREST, COLLECTION_RADIUS_METERS } from './constants';
import MapContainer from './components/MapContainer';
import Dashboard from './components/Dashboard';

// Haversine distance formula
const haversineDistance = (coords1: Coordinates, coords2: Coordinates): number => {
  const R = 6371e3; // metres
  const φ1 = coords1.lat * Math.PI / 180;
  const φ2 = coords2.lat * Math.PI / 180;
  const Δφ = (coords2.lat - coords1.lat) * Math.PI / 180;
  const Δλ = (coords2.lng - coords1.lng) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
};

const App: React.FC = () => {
  const [steps, setSteps] = useState<number>(() => {
    try {
      const savedSteps = localStorage.getItem('treasureHuntSteps');
      return savedSteps ? JSON.parse(savedSteps) : 0;
    } catch {
      return 0;
    }
  });
  
  const [collectedItemIds, setCollectedItemIds] = useState<string[]>(() => {
    try {
      const savedItemIds = localStorage.getItem('treasureHuntCollectedItemIds');
      return savedItemIds ? JSON.parse(savedItemIds) : [];
    } catch {
      return [];
    }
  });

  const [visitedPoiIds, setVisitedPoiIds] = useState<string[]>(() => {
    try {
      const savedPoiIds = localStorage.getItem('treasureHuntVisitedPoiIds');
      return savedPoiIds ? JSON.parse(savedPoiIds) : [];
    } catch {
      return [];
    }
  });

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultCenter = POINTS_OF_INTEREST[0].coords;

  // Derive inventory from collected item IDs
  const inventory: Item[] = useMemo(() =>
    collectedItemIds.map(itemId => {
      const poi = POINTS_OF_INTEREST.find(p => p.item.id === itemId);
      return poi!.item;
    }),
  [collectedItemIds]);
  
  // Persist state to localStorage on change
  useEffect(() => {
    localStorage.setItem('treasureHuntSteps', JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('treasureHuntCollectedItemIds', JSON.stringify(collectedItemIds));
  }, [collectedItemIds]);

  useEffect(() => {
    localStorage.setItem('treasureHuntVisitedPoiIds', JSON.stringify(visitedPoiIds));
  }, [visitedPoiIds]);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setError(null);
      },
      (err) => {
        setError(`Erro ao obter localização: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (userLocation) {
      POINTS_OF_INTEREST.forEach((poi) => {
        if (!visitedPoiIds.includes(poi.id)) {
          const distance = haversineDistance(userLocation, poi.coords);
          if (distance < COLLECTION_RADIUS_METERS) {
            setCollectedItemIds((prevIds) => [...prevIds, poi.item.id]);
            setVisitedPoiIds((prevIds) => [...prevIds, poi.id]);
            // You could add a toast notification here
            alert(`Você encontrou: ${poi.item.name} em ${poi.name}!`);
          }
        }
      });
    }
  }, [userLocation, visitedPoiIds]);

  const handleStep = useCallback(() => {
    setSteps((s) => s + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Escola Gênios: Caça ao Tesouro</h1>
          <p className="text-lg text-gray-600 mt-2">Explore o campus, colete itens e divirta-se!</p>
        </header>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md" role="alert">
            <p className="font-bold">Atenção</p>
            <p>{error} O mapa mostrará uma localização padrão.</p>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          <div className="lg:col-span-2 w-full h-full min-h-[400px]">
            <MapContainer center={userLocation || defaultCenter} />
          </div>
          <div className="lg:col-span-1 bg-gray-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 max-h-full overflow-hidden">
            <Dashboard
              steps={steps}
              onStep={handleStep}
              pois={POINTS_OF_INTEREST}
              visitedPoiIds={visitedPoiIds}
              userLocation={userLocation}
              inventory={inventory}
              haversineDistance={haversineDistance}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
