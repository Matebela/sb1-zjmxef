import React from 'react';
import { Transaction, MonthlyTotal } from '../types/healthcare';

interface TransactionTableProps {
  transactions: Transaction[];
  monthlyTotals: Record<string, MonthlyTotal>;
  totalCharges: number;
  totalRefunds: number;
  netTotal: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  monthlyTotals,
  totalCharges,
  totalRefunds,
  netTotal 
}) => {
  const sortedMonths = Object.entries(monthlyTotals)
    .sort(([a], [b]) => b.localeCompare(a));

  const averageMonthlySpend = netTotal / sortedMonths.length;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800">Total Charges</h4>
          <p className="text-2xl font-bold text-green-600">${totalCharges.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-red-800">Total Refunds</h4>
          <p className="text-2xl font-bold text-red-600">${Math.abs(totalRefunds).toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800">Net Total</h4>
          <p className="text-2xl font-bold text-blue-600">${netTotal.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-800">Monthly Average</h4>
          <p className="text-2xl font-bold text-purple-600">${averageMonthlySpend.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Summary</h4>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charges</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refunds</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedMonths.map(([month, data]) => (
                <tr key={month}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ${data.charges.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    ${Math.abs(data.refunds).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={data.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${data.net.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h4>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr 
                  key={index} 
                  className={`${
                    transaction.type === 'REFUND' 
                      ? 'bg-red-50 hover:bg-red-100' 
                      : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.plan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'CHARGE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.coverageType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;