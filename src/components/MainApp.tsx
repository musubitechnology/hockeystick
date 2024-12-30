import React, { useState } from 'react';
import { ExternalLink, Sword } from 'lucide-react';
import { Slider } from './Slider';
import { StickRecommendation } from './StickRecommendation';
import { StickLengthGuide } from './StickLengthGuide';
import { Explainer } from './Explainer';
import { BladeQuotes } from './BladeQuotes';
import { LieExplanation } from './LieExplanation';
import { FlexExplanation } from './FlexExplanation';
import { FAQ } from './FAQ';
import { InventoryButton } from './InventoryButton';
import { convertToInches, convertToLbs } from '../utils/calculations';
import { getStickRecommendations } from '../utils/recommendations';

export const MainApp: React.FC = () => {
  const [height, setHeight] = useState<number>(70);
  const [heightUnit, setHeightUnit] = useState<'inches' | 'meters'>('inches');
  const [weight, setWeight] = useState<number>(180);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [skatingStyle, setSkatingStyle] = useState<number>(50);
  const [shootingStyle, setShootingStyle] = useState<number>(50);
  const [playStyle, setPlayStyle] = useState<number>(50);

  const heightInInches = convertToInches(height, heightUnit);
  const weightInLbs = convertToLbs(weight, weightUnit);
  const recommendations = getStickRecommendations(
    heightInInches,
    weightInLbs,
    skatingStyle,
    shootingStyle,
    playStyle
  );

  const topRecommendation = recommendations.recommendations[0];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Sword className="w-8 h-8 text-blue-600 mr-3 rotate-45" />
          <h1 className="text-3xl font-bold text-gray-900">Hockey Stick Finder</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Player Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as 'inches' | 'meters')}
                  className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="inches">inches</option>
                  <option value="meters">meters</option>
                </select>
              </div>
              {heightUnit === 'inches' && (
                <p className="text-sm text-gray-500 mt-1">
                  {Math.floor(height / 12)}'{height % 12}"
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                  className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skating Style
              </label>
              <Slider
                value={skatingStyle}
                onChange={setSkatingStyle}
                leftLabel="Very Low Stance"
                rightLabel="Hardly ever bend my knees"
                id="skating-style"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shooting Style
              </label>
              <Slider
                value={shootingStyle}
                onChange={setShootingStyle}
                leftLabel="Quick Snipes & Toe Drags"
                rightLabel="One Timers & Slappers"
                id="shooting-style"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Play Style
              </label>
              <Slider
                value={playStyle}
                onChange={setPlayStyle}
                leftLabel="Dangler"
                rightLabel="Straightforward"
                id="play-style"
              />
            </div>
          </div>
        </div>

        <StickLengthGuide heightInInches={heightInInches} weightInLbs={weightInLbs} />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Recommended Sticks</h2>
            <a
              href="https://www.hockeystickman.com/blogs/hockey-stick-alerts/10681461-what-is-the-right-hockey-stick-length"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Read More About Stick Length
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
          {recommendations.recommendations.map((rec, index) => (
            <StickRecommendation
              key={index}
              recommendation={rec}
              rank={index + 1}
            />
          ))}
        </div>

        {topRecommendation && (
          <>
            <FlexExplanation flex={topRecommendation.flex} weightInLbs={weightInLbs} />
            <BladeQuotes pattern={topRecommendation.name.split(' ')[0]} />
            <LieExplanation lie={topRecommendation.lie} />
          </>
        )}

        <FAQ />
        <Explainer />
      </div>
      <InventoryButton />
    </div>
  );
};