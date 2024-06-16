import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addReservation } from '../../store/reservationSlice';
import { Container, TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import { ThunkDispatch } from "@reduxjs/toolkit";

interface ReserveFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const schema = yup.object().shape({
  name: yup.string().matches(/^\D+$/, 'Name should not contain numbers').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{11}$/, 'Invalid phone number').required('Phone number is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  guests: yup.number().min(1, 'Must be at least 1 guest').required('Number of guests is required'),
});

const Reserve: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ReserveFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
    },
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSubmit = (data: ReserveFormData) => {
    const { date, time, ...rest } = data;
    const dateTimeString = new Date(`${date}T${time}`).toISOString();

    const reservationData = {
      ...rest,
      date: date,
      time: dateTimeString,
    };

    dispatch(addReservation(reservationData));
    reset();

    // Show snackbar with success message
    setSnackbarMessage('Reservation successfully created!');
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Make a Reservation
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name *"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email *"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone *"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date?.message}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0]
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Time *"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.time}
                  helperText={errors.time?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="guests"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of Guests *"
                  type="number"
                  inputProps={{ min: 1 }}
                  fullWidth
                  error={!!errors.guests}
                  helperText={errors.guests?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Reserve
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Typography variant="body1">{snackbarMessage}</Typography>
      </Snackbar>
    </Container>
  );
};

export default Reserve;
