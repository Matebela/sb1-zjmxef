import React from 'react';
import { LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import SubscriberCards from './SubscriberCards';
import CsvUpload from './CsvUpload';
import { useHealthcareStore } from '../store/healthcareStore';

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const rawData = useHealthcareStore((state) => state.rawData);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">Healthcare Dashboard</h1>
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CsvUpload />
        {rawData ? (
          <SubscriberCards />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Please upload a CSV file to view the dashboard
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;