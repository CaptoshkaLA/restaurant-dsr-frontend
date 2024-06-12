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
        <Grid item>
          <Button variant={activeSection === 'reservations' ? 'contained' : 'outlined'} onClick={() => handleSectionChange('reservations')}>
            Reservations
          </Button>
        </Grid>
        <Grid item>
          <Button variant={activeSection === 'addDish' ? 'contained' : 'outlined'} onClick={() => handleSectionChange('addDish')}>
            Add Dish
          </Button>
        </Grid>
        <Grid item>
          <Button variant={activeSection === 'currentDishes' ? 'contained' : 'outlined'} onClick={() => handleSectionChange('currentDishes')}>
            Current Dishes
          </Button>
        </Grid>
      </Grid>

      {activeSection === 'reservations' && <ReservationList reservations={reservations} />}
      {activeSection === 'addDish' && <DishForm dishes={dishes} />}
      {activeSection === 'currentDishes' && <CurrentDishes dishes={dishes} />}
    </Container>
  );
};

export default AdminDashboard;
