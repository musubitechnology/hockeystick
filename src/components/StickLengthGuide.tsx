import React from 'react';
import { Ruler } from 'lucide-react';

interface StickLengthGuideProps {
  heightInInches: number;
  weightInLbs: number;
}

export const StickLengthGuide: React.FC<StickLengthGuideProps> = ({ heightInInches, weightInLbs }) => {
  const getCategory = () => {
    const heightInFeet = heightInInches / 12;
    
    if (heightInFeet >= 5.25 && weightInLbs >= 130) {
      return {
        category: 'Senior',
        heightRange: "5'3\"+ ",
        weightRange: '130 lbs.+',
        stickLength: '56-63 inches'
      };
    } else if (heightInFeet >= 4.83 && weightInLbs >= 80) {
      return {
        category: 'Intermediate',
        heightRange: "4'10\" - 5'7\"",
        weightRange: '80 - 160 lbs.',
        stickLength: '54 inches'
      };
    } else {
      return {
        category: 'Junior',
        heightRange: "3'10\" - 5'2\"",
        weightRange: '50 - 120 lbs.',
        stickLength: '46-53 inches'
      };
    }
  };

  const recommendation = getCategory();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Ruler className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Recommended Stick Length</h3>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-blue-800 font-semibold text-lg">
              {recommendation.category} Stick
            </span>
            <span className="text-blue-600 ml-2">
              ({recommendation.stickLength})
            </span>
          </div>
          <div className="text-sm text-blue-700 mt-2 sm:mt-0">
            For players {recommendation.heightRange} and {recommendation.weightRange}
          </div>
        </div>
      </div>
    </div>
  );
};