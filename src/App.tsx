import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Home from './components/Pages/Home';
import Menu from './components/Pages/Menu';
import Reserve from './components/Pages/Reserve';
import Login from './components/Pages/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Header from './components/Layout/Header';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={token ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
