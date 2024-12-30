export type StickCategory = 'Senior' | 'Junior' | 'Youth' | 'Intermediate';

export const parseCategory = (model: string): StickCategory => {
  const modelLower = model.toLowerCase();
  
  if (modelLower.includes('sr') || modelLower.includes('senior')) {
    return 'Senior';
  } else if (modelLower.includes('jr') || modelLower.includes('junior')) {
    return 'Junior';
  } else if (modelLower.includes('yth') || modelLower.includes('youth')) {
    return 'Youth';
  } else if (modelLower.includes('int') || modelLower.includes('intermediate')) {
    return 'Intermediate';
  }
  
  // Default to Senior if no category is found
  return 'Senior';
};