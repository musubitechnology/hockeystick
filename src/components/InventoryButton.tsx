import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';

export const InventoryButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/inventory')}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 flex items-center space-x-2"
    >
      <Store className="w-5 h-5" />
      <span>Check Henderson Inventory</span>
    </button>
  );
};