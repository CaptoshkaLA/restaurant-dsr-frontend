import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import Home from './components/Pages/Home';
import Menu from './components/Pages/Menu';
import Reserve from './components/Pages/Reserve';
import Login from './components/Pages/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Header from './components/Layout/Header';
import ContactInfo from './components/Pages/ContactInfo';
import { Container } from '@mui/material';
import { logout, refreshToken } from './store/authSlice';
import {ThunkDispatch} from "@reduxjs/toolkit";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const interval = setInterval(() => {
        dispatch(refreshToken());
      }, 15 * 60 * 1000); // Refresh token every 15 minutes

      return () => clearInterval(interval);
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

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
          <Route path="/contacts" element={<ContactInfo />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
