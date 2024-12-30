import React, { useRef, useState } from 'react';
import { Upload, X, Download } from 'lucide-react';
import { parseCSV } from '../utils/csvParser';
import { downloadBlankCSV } from '../utils/csvTemplate';
import { useInventory } from '../hooks/useInventory';

export const CSVUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addStick } = useInventory();
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setErrors([]);

    try {
      const text = await file.text();
      const result = parseCSV(text);
      
      if (result.success) {
        result.sticks.forEach(stick => {
          addStick(stick);
        });
        alert(`Successfully imported ${result.sticks.length} sticks`);
      } else {
        setErrors(result.errors);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setErrors(['Error reading file. Please check the format and try again.']);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Inventory</span>
        </label>
        <button
          onClick={downloadBlankCSV}
          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          <Download className="w-4 h-4" />
          <span>Download Template</span>
        </button>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          Expected format (Tab-separated):
        </p>
        <p className="text-sm font-mono text-gray-600">
          Model  Curve  Hand  Flex  Weight (g)  QTY  PRICE
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-red-800 font-medium">Upload Errors</h4>
            <button 
              onClick={() => setErrors([])}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};