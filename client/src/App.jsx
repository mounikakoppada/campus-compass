import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Planner from './pages/Planner';
import Guidance from './pages/Guidance';
import Coding from './pages/Coding';
import Community from './pages/Community';
import Wellbeing from './pages/Wellbeing';
import AdminDashboard from './pages/AdminDashboard';
import ChatAssistant from './components/ChatAssistant';
import './index.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
          <Route path="/guidance" element={<PrivateRoute><Guidance /></PrivateRoute>} />
          <Route path="/planner" element={<PrivateRoute><Planner /></PrivateRoute>} />
          <Route path="/coding" element={<PrivateRoute><Coding /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
          <Route path="/wellbeing" element={<PrivateRoute><Wellbeing /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/roadmap" />} />
        </Routes>
      </Router>
      <ChatAssistant />
    </AuthProvider>
  );
}

export default App;
