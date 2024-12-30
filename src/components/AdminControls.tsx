import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { downloadInventoryCSV } from '../utils/inventoryExport';

export const AdminControls: React.FC = () => {
  const { inventory, cleanInventory } = useInventory();
  const [showConfirmClean, setShowConfirmClean] = useState(false);

  const handleCleanInventory = async () => {
    await cleanInventory();
    setShowConfirmClean(false);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <button
        onClick={() => downloadInventoryCSV(inventory)}
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        <Download className="w-4 h-4" />
        <span>Download All Inventory</span>
      </button>

      <button
        onClick={() => setShowConfirmClean(true)}
        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        <Trash2 className="w-4 h-4" />
        <span>Clean Inventory</span>
      </button>

      {showConfirmClean && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Clean Inventory</h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete all inventory items. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmClean(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCleanInventory}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};