import React from 'react';

export const Explainer: React.FC = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Tool</h2>
      <p className="text-gray-600 leading-relaxed">
        This tool was created to make choosing the perfect hockey stick easier and more straightforward. 
        We synthesized insights from dozens of trusted articles and expert sources across the web, 
        combining them with the power of AI to deliver accurate, easy-to-understand guidance. 
        By distilling key information and tailoring it into a user-friendly resource, 
        this tool helps players of all ages and skill levels find a stick that matches their needs, 
        improving performance and confidence on the ice.
      </p>
    </div>
  );
};