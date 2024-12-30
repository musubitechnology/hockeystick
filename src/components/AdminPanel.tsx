import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { CSVUpload } from './CSVUpload';
import { PasteInventory } from './PasteInventory';
import { AdminControls } from './AdminControls';

export const AdminPanel: React.FC = () => {
  const { addStick, fetchInventory } = useInventory();
  const [newStick, setNewStick] = useState({
    model: '',
    curve: '',
    hand: 'RH' as const,
    flex: 0,
    weight: 0,
    price: 0,
    quantity: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStick(newStick);
      await fetchInventory();
      setNewStick({
        model: '',
        curve: '',
        hand: 'RH',
        flex: 0,
        weight: 0,
        price: 0,
        quantity: 1
      });
    } catch (error) {
      console.error('Error adding stick:', error);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
      
      <AdminControls />
      <CSVUpload />
      <PasteInventory />
      
      <h3 className="text-lg font-semibold mb-4">Add Single Stick</h3>
      {/* Rest of the form code remains the same */}
    </div>
  );
};