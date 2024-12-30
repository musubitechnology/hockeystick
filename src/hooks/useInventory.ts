import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StickInventory } from '../types/inventory';
import { parseCategory } from '../utils/categoryParser';

export const useInventory = () => {
  const [inventory, setInventory] = useState<StickInventory[]>([]);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const addStick = async (stick: Omit<StickInventory, 'id' | 'category'>) => {
    try {
      const category = parseCategory(stick.model);
      const { error } = await supabase
        .from('inventory')
        .insert([{
          ...stick,
          category,
          is_sold: stick.price === 'SOLD'
        }]);

      if (error) throw error;
      await fetchInventory();
    } catch (error) {
      console.error('Error adding stick:', error);
      throw error;
    }
  };

  const updateStick = async (id: string, updatedStick: Partial<StickInventory>) => {
    try {
      const category = updatedStick.model ? parseCategory(updatedStick.model) : undefined;
      const { error } = await supabase
        .from('inventory')
        .update({
          ...updatedStick,
          ...(category && { category }),
          is_sold: updatedStick.price === 'SOLD'
        })
        .eq('id', id);

      if (error) throw error;
      await fetchInventory();
    } catch (error) {
      console.error('Error updating stick:', error);
      throw error;
    }
  };

  const cleanInventory = async () => {
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

      if (error) throw error;
      await fetchInventory();
    } catch (error) {
      console.error('Error cleaning inventory:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    inventory,
    addStick,
    updateStick,
    cleanInventory,
    fetchInventory
  };
};