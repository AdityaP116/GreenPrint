import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Roadmap from './pages/Roadmap';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Reports from './pages/Reports';
import Navbar from './components/ui/Navbar';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
              <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
              <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
              <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
