import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchReservations } from '../../store/reservationSlice';
import { Container, Typography, Button, Grid } from '@mui/material';
import ReservationList from './ReservationList';
import DishForm from './DishForm';
import CurrentDishes from './CurrentDishes';
import { ThunkDispatch } from "@reduxjs/toolkit";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const reservations = useSelector((state: RootState) => state.reservations.reservations);
  const dishes = useSelector((state: RootState) => state.dishes.dishes);

  const [activeSection, setActiveSection] = useState<'reservations' | 'addDish' | 'currentDishes'>('reservations');

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleSectionChange = (section: 'reservations' | 'addDish' | 'currentDishes') => {
    setActiveSection(section);
  };

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button variant={activeSection === 'reservations' ? 'contained' : 'outlined'} fullWidth onClick={() => handleSectionChange('reservations')}>
            Reservations
          </Button>
        </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant={activeSection === 'addDish' ? 'contained' : 'outlined'} fullWidth onClick={() => handleSectionChange('addDish')}>
            Add Dish
          </Button>
        </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant={activeSection === 'currentDishes' ? 'contained' : 'outlined'} fullWidth onClick={() => handleSectionChange('currentDishes')}>
            Current Dishes
          </Button>
        </Grid>
      </Grid>

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '1rem' }}>
          <Grid item xs={12}>
      {activeSection === 'reservations' && <ReservationList reservations={reservations} />}
      {activeSection === 'addDish' && <DishForm dishes={dishes} />}
      {activeSection === 'currentDishes' && <CurrentDishes dishes={dishes} />}
          </Grid>
        </Grid>
    </Container>
  );
};

export default AdminDashboard;
