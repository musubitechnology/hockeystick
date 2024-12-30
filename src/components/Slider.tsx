import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  id: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  leftLabel,
  rightLabel,
  id
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="text-left">{leftLabel}</span>
        <span className="text-right">{rightLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        id={id}
      />
    </div>
  );
};