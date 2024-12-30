import { StickInventory } from '../types/inventory';

interface ParseResult {
  success: boolean;
  sticks: Omit<StickInventory, 'id'>[];
  errors: string[];
}

export const parseCSV = (csvText: string): ParseResult => {
  const lines = csvText.split('\n');
  const sticks: Omit<StickInventory, 'id'>[] = [];
  const errors: string[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      // Split on tab character
      const [model, curve, hand, flex, weight, qty, price] = line.split('\t').map(val => val.trim());

      // Validate required fields
      if (!model || !curve || !hand || !flex || !weight || !qty || !price) {
        errors.push(`Line ${i + 1}: Missing required fields`);
        continue;
      }

      // Validate hand value
      if (hand !== 'LH' && hand !== 'RH') {
        errors.push(`Line ${i + 1}: Invalid hand value "${hand}" - must be LH or RH`);
        continue;
      }

      // Validate numeric values
      const flexNum = parseInt(flex, 10);
      const weightNum = parseInt(weight, 10);
      const qtyNum = parseInt(qty, 10);
      
      if (isNaN(flexNum)) {
        errors.push(`Line ${i + 1}: Invalid flex value "${flex}"`);
        continue;
      }
      
      if (isNaN(weightNum)) {
        errors.push(`Line ${i + 1}: Invalid weight value "${weight}"`);
        continue;
      }

      if (isNaN(qtyNum) || qtyNum < 0) {
        errors.push(`Line ${i + 1}: Invalid quantity value "${qty}"`);
        continue;
      }

      // Process price
      let processedPrice: number | 'SOLD';
      if (price.trim().toUpperCase() === 'SOLD') {
        processedPrice = 'SOLD';
      } else {
        // Remove currency symbol, spaces, and commas
        const priceNum = parseFloat(price.replace(/[$,\s]/g, ''));
        if (isNaN(priceNum)) {
          errors.push(`Line ${i + 1}: Invalid price value "${price}"`);
          continue;
        }
        processedPrice = priceNum;
      }

      sticks.push({
        model,
        curve,
        hand: hand as 'LH' | 'RH',
        flex: flexNum,
        weight: weightNum,
        price: processedPrice,
        quantity: qtyNum
      });
    } catch (error) {
      errors.push(`Line ${i + 1}: Invalid format`);
    }
  }

  return {
    success: errors.length === 0 && sticks.length > 0,
    sticks,
    errors
  };
};