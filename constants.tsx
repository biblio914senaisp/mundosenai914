
import React from 'react';
import type { PointOfInterest } from './types';
import BookIcon from './components/icons/BookIcon';
import FlaskIcon from './components/icons/FlaskIcon';
import GlobeIcon from './components/icons/GlobeIcon';
import TrophyIcon from './components/icons/TrophyIcon';

export const COLLECTION_RADIUS_METERS = 20; // 20 meters

const baseCoords = { lat: -23.5615, lng: -46.6565 }; // Near Paulista Avenue, SP for demo

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Biblioteca Central',
    description: 'O coração do conhecimento da nossa escola.',
    coords: { lat: baseCoords.lat, lng: baseCoords.lng },
    item: { id: 'item-1', name: 'Livro Raro', icon: <BookIcon /> },
  },
  {
    id: 'poi-2',
    name: 'Laboratório de Ciências',
    description: 'Onde a mágica da ciência acontece!',
    coords: { lat: baseCoords.lat + 0.0003, lng: baseCoords.lng + 0.0003 },
    item: { id: 'item-2', name: 'Fórmula Secreta', icon: <FlaskIcon /> },
  },
  {
    id: 'poi-3',
    name: 'Quadra de Esportes',
    description: 'Aqui nascem os campeões.',
    coords: { lat: baseCoords.lat - 0.0003, lng: baseCoords.lng + 0.0002 },
    item: { id: 'item-3', name: 'Troféu de Ouro', icon: <TrophyIcon /> },
  },
  {
    id: 'poi-4',
    name: 'Sala de Geografia',
    description: 'Viaje pelo mundo sem sair da escola.',
    coords: { lat: baseCoords.lat + 0.0001, lng: baseCoords.lng - 0.0004 },
    item: { id: 'item-4', name: 'Globo Antigo', icon: <GlobeIcon /> },
  },
];
