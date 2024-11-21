import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useHealthcareStore } from '../store/healthcareStore';

const CsvUpload: React.FC = () => {
  const setHealthcareData = useHealthcareStore(state => state.setHealthcareData);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setHealthcareData(text);
    };
    reader.readAsText(file);
  }, [setHealthcareData]);

  return (
    <div className="mb-8">
      <label 
        htmlFor="csv-upload" 
        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="w-8 h-8 text-blue-500" />
          <span className="text-sm font-medium text-gray-600">Upload CSV File</span>
          <span className="text-xs text-gray-500">Click or drag and drop</span>
        </div>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default CsvUpload;