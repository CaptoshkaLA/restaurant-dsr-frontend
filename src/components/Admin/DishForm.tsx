import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addDish, fetchDishes } from '../../store/dishSlice';
import { TextField, Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import { ThunkDispatch } from "@reduxjs/toolkit";

interface DishFormData {
  name: string;
  description: string;
  shortDescription: string;
  recipe: string;
  ingredients: string;
  imageUrl: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  shortDescription: yup.string().required('Short Description is required'),
  recipe: yup.string().required('Recipe is required'),
  ingredients: yup.string().required('Ingredients are required'),
  imageUrl: yup.string().required('Image URL is required'),
});

const DishForm: React.FC<{ dishes: any[] }> = ({ dishes }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { control, handleSubmit, reset } = useForm<DishFormData>({
    resolver: yupResolver(schema),
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const onSubmit = (data: DishFormData) => {
    dispatch(addDish(data));
    reset();
  };

  useEffect(() => {
    if (dishes.length > 0) {
      setShowSnackbar(true);
      setSnackbarMessage('Dish successfully added!');
    }
  }, [dishes]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Add New Dish
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Name" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField {...field} label="Description" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="shortDescription"
              control={control}
              render={({ field }) => <TextField {...field} label="Short Description" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="recipe"
              control={control}
              render={({ field }) => <TextField {...field} label="Recipe" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="ingredients"
              control={control}
              render={({ field }) => <TextField {...field} label="Ingredients" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => <TextField {...field} label="Image URL" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Dish
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

export default DishForm;
