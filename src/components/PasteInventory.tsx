import React, { useState } from 'react';
import { Clipboard, AlertCircle } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { parsePastedData } from '../utils/pasteParser';

export const PasteInventory: React.FC = () => {
  const { addStick, fetchInventory } = useInventory();
  const [pastedData, setPastedData] = useState('');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    const result = parsePastedData(pastedData);
    if (result.success && result.data) {
      setParsedData(result.data);
      setShowConfirm(true);
      setError(null);
    } else {
      setError(result.error || 'Failed to parse data');
      setShowConfirm(false);
    }
  };

  const handleConfirm = async () => {
    if (parsedData.length > 0) {
      try {
        for (const item of parsedData) {
          await addStick(item);
        }
        await fetchInventory();
        setPastedData('');
        setParsedData([]);
        setShowConfirm(false);
      } catch (error) {
        console.error('Error adding items:', error);
        setError('Failed to add items. Please try again.');
      }
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Paste Inventory</h3>
      <div className="space-y-4">
        <textarea
          value={pastedData}
          onChange={(e) => setPastedData(e.target.value)}
          placeholder="Paste tab-separated inventory data here..."
          className="w-full h-32 p-2 border rounded-md"
        />
        
        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {!showConfirm ? (
          <button
            onClick={handleParse}
            disabled={!pastedData.trim()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            <Clipboard className="w-4 h-4" />
            <span>Parse Data</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800">
                Successfully parsed {parsedData.length} items. Review the data below and click confirm to add to inventory.
              </p>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Curve</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hand</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Flex</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parsedData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.model}</td>
                      <td className="px-4 py-2">{item.curve}</td>
                      <td className="px-4 py-2">{item.hand}</td>
                      <td className="px-4 py-2">{item.flex}</td>
                      <td className="px-4 py-2">{item.weight}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Add
              </button>
              <button
                onClick={() => {
                  setParsedData([]);
                  setShowConfirm(false);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};