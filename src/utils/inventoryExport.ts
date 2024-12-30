import { StickInventory } from '../types/inventory';

export const downloadInventoryCSV = (inventory: StickInventory[]) => {
  const headers = ['Model', 'Curve', 'Hand', 'Flex', 'Weight (g)', 'QTY', 'PRICE'];
  const rows = inventory.map(stick => [
    stick.model,
    stick.curve,
    stick.hand,
    stick.flex.toString(),
    stick.weight.toString(),
    stick.quantity.toString(),
    stick.price === 'SOLD' ? 'SOLD' : stick.price.toString()
  ]);

  const csvContent = [
    headers.join('\t'),
    ...rows.map(row => row.join('\t'))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};