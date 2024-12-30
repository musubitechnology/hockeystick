// Utility functions for hockey stick calculations
export const convertToInches = (value: number, unit: 'meters' | 'inches'): number => {
  if (unit === 'meters') {
    return value * 39.3701;
  }
  return value;
};

export const calculateStickLength = (heightInInches: number): number => {
  return heightInInches * 0.91;
};

export const convertToLbs = (value: number, unit: 'kg' | 'lbs'): number => {
  if (unit === 'kg') {
    return value * 2.20462;
  }
  return value;
};

export const calculateFlex = (weightInLbs: number): number => {
  const calculatedFlex = weightInLbs / 2;
  return Math.min(calculatedFlex, 120); // Cap flex at 120
};

export const calculateLie = (skatingStyle: number): number => {
  if (skatingStyle <= 20) return 4;
  if (skatingStyle <= 40) return 5;
  if (skatingStyle <= 60) return 5.5;
  if (skatingStyle <= 80) return 6;
  return 7;
};