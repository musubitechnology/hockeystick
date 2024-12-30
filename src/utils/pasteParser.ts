interface ParseResult {
  success: boolean;
  data?: any[];
  error?: string;
}

export const parsePastedData = (data: string): ParseResult => {
  try {
    const lines = data.trim().split('\n');
    const parsedItems = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [model, curve, hand, flex, weight, qty, price] = line.split('\t');

      if (!model || !curve || !hand || !flex || !weight || !qty || !price) {
        return {
          success: false,
          error: `Line ${i + 1}: Missing required fields`
        };
      }

      if (hand !== 'LH' && hand !== 'RH') {
        return {
          success: false,
          error: `Line ${i + 1}: Hand must be LH or RH`
        };
      }

      const flexNum = parseInt(flex);
      const weightNum = parseInt(weight);
      const qtyNum = parseInt(qty);

      if (isNaN(flexNum)) {
        return {
          success: false,
          error: `Line ${i + 1}: Invalid flex value`
        };
      }

      if (isNaN(weightNum)) {
        return {
          success: false,
          error: `Line ${i + 1}: Invalid weight value`
        };
      }

      if (isNaN(qtyNum) || qtyNum < 0) {
        return {
          success: false,
          error: `Line ${i + 1}: Invalid quantity value`
        };
      }

      let processedPrice: number | 'SOLD';
      if (price.toUpperCase() === 'SOLD') {
        processedPrice = 'SOLD';
      } else {
        const priceNum = parseFloat(price.replace(/[$,]/g, ''));
        if (isNaN(priceNum)) {
          return {
            success: false,
            error: `Line ${i + 1}: Invalid price value`
          };
        }
        processedPrice = priceNum;
      }

      parsedItems.push({
        model,
        curve,
        hand,
        flex: flexNum,
        weight: weightNum,
        quantity: qtyNum,
        price: processedPrice
      });
    }

    return {
      success: true,
      data: parsedItems
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid data format'
    };
  }
};