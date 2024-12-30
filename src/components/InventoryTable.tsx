import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { EditableRow } from './EditableRow';
import { StickInventory } from '../types/inventory';

interface InventoryTableProps {
  isAdmin: boolean;
  getSortedInventory: (inventory: StickInventory[]) => StickInventory[];
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ 
  isAdmin, 
  getSortedInventory 
}) => {
  const { inventory, updateStick } = useInventory();
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedInventory = getSortedInventory(inventory);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (id: string, updatedStick: Partial<StickInventory>) => {
    await updateStick(id, updatedStick);
    setEditingId(null);
  };

  const handleMarkAsSold = async (stick: StickInventory) => {
    await updateStick(stick.id, { 
      ...stick,
      is_sold: true,
      quantity: 0
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full table-fixed divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {isAdmin && <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            <th scope="col" className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curve</th>
            <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hand</th>
            <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flex</th>
            <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (g)</th>
            <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
            <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedInventory.map((stick, index) => (
            editingId === stick.id ? (
              <EditableRow
                key={stick.id}
                stick={stick}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <tr key={stick.id} className={stick.is_sold ? 'bg-gray-50' : undefined}>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(stick.id)}
                        className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      {!stick.is_sold && (
                        <button
                          onClick={() => handleMarkAsSold(stick)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          Mark as Sold
                        </button>
                      )}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${stick.category === 'Senior' ? 'bg-blue-100 text-blue-800' :
                      stick.category === 'Junior' ? 'bg-green-100 text-green-800' :
                      stick.category === 'Youth' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {stick.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.curve}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.hand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.flex}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stick.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stick.is_sold ? (
                    <span className="text-red-600 font-medium">SOLD</span>
                  ) : (
                    `$${stick.price.toFixed(2)}`
                  )}
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};