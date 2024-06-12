import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchReservations } from '../../store/reservationSlice';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import ReservationList from './ReservationList';
import DishForm from './DishForm';
import {ThunkDispatch} from "@reduxjs/toolkit";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const reservations = useSelector((state: RootState) => state.reservations.reservations);
  const dishes = useSelector((state: RootState) => state.dishes.dishes);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <ReservationList reservations={reservations} />
      <DishForm dishes={dishes} />
    </Container>
  );
};

export default AdminDashboard;
