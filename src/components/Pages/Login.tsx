import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { RootState } from '../../store';
import { Container, TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from "@reduxjs/toolkit";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate(); // Используйте useNavigate hook

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  if (token) {
    navigate("/admin/dashboard"); // Выполните перенаправление с помощью useNavigate
    return null; // Верните null или что-то другое вместо компонента Redirect
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} label="Email" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
