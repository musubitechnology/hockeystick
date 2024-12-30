import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { StickInventory, StickCategory } from '../types/inventory';

interface EditableRowProps {
  stick: StickInventory;
  onSave: (id: string, updatedStick: Partial<StickInventory>) => Promise<void>;
  onCancel: () => void;
}

export const EditableRow: React.FC<EditableRowProps> = ({ stick, onSave, onCancel }) => {
  const [editedStick, setEditedStick] = useState({ ...stick });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(stick.id, editedStick);
      onCancel();
    } catch (error) {
      console.error('Error saving stick:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const categories: StickCategory[] = ['Senior', 'Junior', 'Intermediate', 'Youth'];

  return (
    <tr className="bg-blue-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Save changes"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">#</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={editedStick.model}
          onChange={(e) => setEditedStick({ ...editedStick, model: e.target.value })}
          className="w-full border rounded px-2 py-1"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={editedStick.category}
          onChange={(e) => setEditedStick({ ...editedStick, category: e.target.value as StickCategory })}
          className="border rounded px-2 py-1"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={editedStick.curve}
          onChange={(e) => setEditedStick({ ...editedStick, curve: e.target.value })}
          className="w-32 border rounded px-2 py-1"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={editedStick.hand}
          onChange={(e) => setEditedStick({ ...editedStick, hand: e.target.value as 'LH' | 'RH' })}
          className="border rounded px-2 py-1"
        >
          <option value="LH">LH</option>
          <option value="RH">RH</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={editedStick.flex}
          onChange={(e) => setEditedStick({ ...editedStick, flex: parseInt(e.target.value) })}
          className="w-20 border rounded px-2 py-1"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={editedStick.weight}
          onChange={(e) => setEditedStick({ ...editedStick, weight: parseInt(e.target.value) })}
          className="w-24 border rounded px-2 py-1"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={editedStick.quantity}
          onChange={(e) => setEditedStick({ ...editedStick, quantity: parseInt(e.target.value) })}
          className="w-20 border rounded px-2 py-1"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={editedStick.price}
          onChange={(e) => setEditedStick({ ...editedStick, price: parseFloat(e.target.value) })}
          className="w-24 border rounded px-2 py-1"
          step="0.01"
        />
      </td>
    </tr>
  );
};