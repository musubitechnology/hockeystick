import React from 'react';
import { Quote } from 'lucide-react';
import { bladeQuotes } from '../data/bladeQuotes';

interface BladeQuotesProps {
  pattern: string;
}

export const BladeQuotes: React.FC<BladeQuotesProps> = ({ pattern }) => {
  const relevantQuotes = bladeQuotes.filter(quote => quote.pattern === pattern);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center mb-4">
        <Quote className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">What the internet says about the {pattern} blade pattern</h3>
      </div>
      <div className="space-y-4">
        {relevantQuotes.map((quote, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
            <p className="text-gray-700 italic mb-2">{quote.quote}</p>
            <a 
              href={`https://${quote.source}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Source: {quote.source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};