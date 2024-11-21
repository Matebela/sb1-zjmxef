import React from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import TransactionTable from './TransactionTable';
import { SubscriberData } from '../types/healthcare';

interface SubscriberCardProps {
  id: string;
  data: SubscriberData;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const SubscriberCard: React.FC<SubscriberCardProps> = ({ id, data, isExpanded, onToggle }) => {
  // Sort coverage dates in descending order
  const sortedCoverageDates = Array.from(data.coverageDates).sort((a, b) => {
    const [aStart] = a.split('-');
    const [bStart] = b.split('-');
    return new Date(bStart).getTime() - new Date(aStart).getTime();
  });

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
      isExpanded ? 'col-span-full' : ''
    }`}>
      <div
        className="p-6 cursor-pointer hover:bg-gray-50"
        onClick={() => onToggle(id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
              <p className="text-sm text-gray-500">ID: {id}</p>
              <p className="text-sm text-gray-600 mt-1">{data.coverageType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Net Total</p>
              <p className={`text-lg font-semibold ${data.netTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(data.netTotal).toFixed(2)}
              </p>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Active Plans</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {Array.from(data.plans).sort().map((plan: string) => (
                    <li key={plan} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Coverage Periods</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {sortedCoverageDates.map((date: string) => (
                    <li key={date} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {date}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <TransactionTable 
              transactions={data.transactions}
              monthlyTotals={data.monthlyTotals}
              totalCharges={data.totalCharges}
              totalRefunds={data.totalRefunds}
              netTotal={data.netTotal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberCard;