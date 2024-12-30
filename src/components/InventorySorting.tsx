import React from 'react';
import { ArrowUpDown } from 'lucide-react';

type SortField = 'category' | 'curve' | 'flex' | 'hand';
type SortDirection = 'asc' | 'desc';

interface InventorySortingProps {
  onSort: (field: SortField) => void;
  currentSort: { field: SortField | null; direction: SortDirection };
}

export const InventorySorting: React.FC<InventorySortingProps> = ({ onSort, currentSort }) => {
  const sortFields: { field: SortField; label: string }[] = [
    { field: 'category', label: 'Category' },
    { field: 'curve', label: 'Curve' },
    { field: 'flex', label: 'Flex' },
    { field: 'hand', label: 'Hand' }
  ];

  return (
    <div className="mb-4 flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      {sortFields.map(({ field, label }) => (
        <button
          key={field}
          onClick={() => onSort(field)}
          className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${currentSort.field === field 
              ? 'bg-blue-100 text-blue-800' 
              : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {label}
          {currentSort.field === field && (
            <ArrowUpDown className="w-4 h-4 ml-1" />
          )}
        </button>
      ))}
    </div>
  );
};