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
import { Container, Snackbar, Alert } from '@mui/material';
import { logout, refreshToken } from './store/authSlice';
import {ThunkDispatch} from "@reduxjs/toolkit";
import { ROUTES } from './constants';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.auth.error);
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
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error">
            {error}
          </Alert>
        </Snackbar>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.RESERVE} element={<Reserve />} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<Login />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={token ? <AdminDashboard /> : <Navigate to={ROUTES.ADMIN_LOGIN} />} />
          <Route path={ROUTES.CONTACTS} element={<ContactInfo />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
