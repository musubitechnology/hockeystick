export interface StickLengthRecommendation {
  category: 'Youth' | 'Junior' | 'Intermediate' | 'Senior';
  lengthRange: string;
}

export function getStickLengthRecommendation(heightInInches: number): StickLengthRecommendation {
  if (heightInInches < 48) { // Under 4ft
    return { category: 'Youth', lengthRange: '38-44 inches' };
  } else if (heightInInches < 60) { // 4ft - 5ft
    return { category: 'Junior', lengthRange: '46-53 inches' };
  } else if (heightInInches < 66) { // 5ft - 5.5ft
    return { category: 'Intermediate', lengthRange: '54 inches' };
  } else { // Over 5.5ft
    return { category: 'Senior', lengthRange: '56-63 inches' };
  }
}