
import React from 'react';
import type { PointOfInterest, Item, Coordinates } from '../types';
import StepCounter from './StepCounter';
import PoiList from './PoiList';
import Inventory from './Inventory';

interface DashboardProps {
  steps: number;
  onStep: () => void;
  pois: PointOfInterest[];
  visitedPoiIds: string[];
  userLocation: Coordinates | null;
  inventory: Item[];
  haversineDistance: (coords1: Coordinates, coords2: Coordinates) => number;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full">
      <StepCounter steps={props.steps} onStep={props.onStep} />
      <PoiList 
        pois={props.pois} 
        visitedPoiIds={props.visitedPoiIds} 
        userLocation={props.userLocation}
        haversineDistance={props.haversineDistance}
      />
      <Inventory items={props.inventory} />
    </div>
  );
};

export default Dashboard;
