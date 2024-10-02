import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/login" />} />
        <Route path="/edit-user/:id" element={token ? <EditUser /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
