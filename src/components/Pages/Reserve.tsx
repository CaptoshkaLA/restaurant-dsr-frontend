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
  datetime: string; // Общее поле для даты и времени
  guests: number;
}

const schema = yup.object().shape({
  name: yup.string().matches(/^\D+$/, 'Name should not contain numbers').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\+?\d{11}$/, 'Invalid phone number').required('Phone number is required'),
  datetime: yup.string().required('Date and Time are required'),
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
      datetime: '',
      guests: 1,
    },
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSubmit = (data: ReserveFormData) => {
    const { datetime, ...rest } = data;

    const selectedDateTime = new Date(datetime);

    const formattedDate = selectedDateTime.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = selectedDateTime.toISOString().slice(11, 16); // HH:MM

    const reservationData = {
      ...rest,
      date: formattedDate,
      time: `${formattedDate}T${formattedTime}:00.000Z`,
    };

    dispatch(addReservation(reservationData));
    reset();

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
              name="datetime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date and Time *"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.datetime}
                  helperText={errors.datetime?.message}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 16),
                  }}
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
