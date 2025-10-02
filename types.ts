import type { ReactElement } from 'react';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Item {
  id: string;
  name:string;
  // Fix: Changed type from JSX.Element to the imported ReactElement to resolve namespace error.
  icon: ReactElement;
}

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  coords: Coordinates;
  item: Item;
}