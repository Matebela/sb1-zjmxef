import React from 'react';
import useAuthStore from './store/authStore';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;