import React from 'react';
import { Scale } from 'lucide-react';

interface FlexExplanationProps {
  flex: number;
  weightInLbs: number;
}

export const FlexExplanation: React.FC<FlexExplanationProps> = ({ flex, weightInLbs }) => {
  const getExplanation = () => {
    const standardFlex = weightInLbs / 2;
    
    if (standardFlex > 120) {
      return `We've capped the recommended flex at 120 (standard calculation would be ${Math.round(standardFlex)}). Hockey sticks usually cap at a 120 flex.`;
    }
    
    return `The recommended flex (${Math.round(flex)}) follows the general rule of half your body weight (${Math.round(weightInLbs/2)} lbs). This provides a good balance of power and control for your playing style.\n\nIf you'd like to try a whippy stick, drop 5 or 10+ pounds off your flex. A lot of players like Taylor Hall, Pacioretty, Kessel and Johnny Gaudreau used abnormally low flexes (about 30-40% of their body weight).`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center mb-4">
        <Scale className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">About Your Flex Rating</h3>
      </div>
      <p className="text-gray-700 whitespace-pre-line">
        {getExplanation()}
      </p>
    </div>
  );
};