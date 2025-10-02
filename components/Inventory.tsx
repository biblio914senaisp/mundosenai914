
import React from 'react';
import type { Item } from '../types';

interface InventoryProps {
  items: Item[];
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Sacola de Itens</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Sua sacola está vazia. Explore para encontrar itens!</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
              <div className="text-blue-500 mr-4">{React.cloneElement(item.icon, { className: 'w-8 h-8' })}</div>
              <span className="font-medium text-gray-800">{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
