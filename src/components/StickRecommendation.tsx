import React from 'react';

interface StickRecommendationProps {
  recommendation: {
    name: string;
    description: string;
    flex: number;
    curve: string;
    lie: number;
    nhlers: string[];
    patterns?: string[];
  };
  rank: number;
}

export const StickRecommendation: React.FC<StickRecommendationProps> = ({
  recommendation,
  rank
}) => {
  const getAdditionalBlurb = (rank: number) => {
    if (rank === 2) {
      return "If you are looking for a stick that will be a bit more versatile and balanced";
    }
    if (rank === 3) {
      return "If you are looking for a stick that will be a bit more demanding but offers more precise puck control for dangling";
    }
    return null;
  };

  const blurb = getAdditionalBlurb(rank);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start mb-4">
        <span className="text-2xl font-bold text-blue-600 mr-3">#{rank}</span>
        <div>
          <h3 className="text-xl font-semibold">{recommendation.name}</h3>
          {blurb && (
            <p className="text-blue-600 text-sm mt-1">
              {blurb}
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{recommendation.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-700">Specifications</h4>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>Flex: {Math.round(recommendation.flex)}</li>
            <li>Curve: {recommendation.curve}</li>
            <li>Lie: {recommendation.lie}</li>
            {recommendation.patterns && (
              <li className="mt-2">
                <span className="font-medium">Also known as:</span>
                <br />
                <span className="text-sm">{recommendation.patterns.join(', ')}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Used by NHL Players</h4>
          <ul className="mt-2 space-y-1 text-gray-600">
            {recommendation.nhlers.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};