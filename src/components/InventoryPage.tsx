import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InventoryTable } from './InventoryTable';
import { AdminPanel } from './AdminPanel';
import { InventorySorting } from './InventorySorting';
import { StickInventory } from '../types/inventory';

type SortField = 'category' | 'curve' | 'flex' | 'hand';
type SortDirection = 'asc' | 'desc';

export const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [sort, setSort] = useState<{ field: SortField | null; direction: SortDirection }>({
    field: null,
    direction: 'asc'
  });

  const handleSort = (field: SortField) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAdminLogin = () => {
    if (password === '117') {
      setIsAdmin(true);
      setShowAdminPrompt(false);
    } else {
      alert('Incorrect password');
    }
  };

  const getSortedInventory = (inventory: StickInventory[]) => {
    if (!sort.field) return inventory;

    return [...inventory].sort((a, b) => {
      const aValue = a[sort.field!];
      const bValue = b[sort.field!];
      
      if (sort.field === 'flex') {
        return sort.direction === 'asc' 
          ? (a.flex - b.flex)
          : (b.flex - a.flex);
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Tool
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Henderson Inventory</h1>
          </div>
          {!isAdmin && (
            <button
              onClick={() => setShowAdminPrompt(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Admin Login
            </button>
          )}
        </div>

        <InventorySorting onSort={handleSort} currentSort={sort} />
        <InventoryTable isAdmin={isAdmin} getSortedInventory={getSortedInventory} />
        {isAdmin && <AdminPanel />}

        {showAdminPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2 mb-4 w-full"
                placeholder="Enter password"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAdminPrompt(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};