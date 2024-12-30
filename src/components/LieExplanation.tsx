import React from 'react';
import { HelpCircle } from 'lucide-react';

interface LieExplanationProps {
  lie: number;
}

const lieDescriptions: Record<number, string> = {
  4: "This is the flattest lie angle, where the blade is almost parallel to the ice when the shaft is vertical. This lie might be used by players who skate very low to the ice or in positions where they need to keep the blade flat for better control.",
  5: "A standard lie for many players, where the blade makes a moderate angle with the ice. This is often used by players who balance between stickhandling and shooting, offering a good compromise for most playing styles.",
  5.5: "Slightly more upright than the 5.0 lie, this could be beneficial for players who skate a bit taller or prefer a bit more leverage for shooting.",
  6: "This lie is for players who skate taller or who might need the stick to be more upright for better reach or for specific playing techniques.",
  7: "This is the most upright lie, where the blade is at a steep angle to the ice. It might be used by very tall players or for specialized techniques where the stick's upright position is crucial."
};

export const LieExplanation: React.FC<LieExplanationProps> = ({ lie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center mb-4">
        <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Why Lie {lie}?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        {lieDescriptions[lie]}
      </p>
      <p className="text-gray-700">
        To learn more about lie, check out this{' '}
        <a 
          href="https://www.hockeyskillstraining.com/stick-lie-which-one-is-right-for-you/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          great article
        </a>{' '}
        by HockeySkillsTraining.com
      </p>
    </div>
  );
};