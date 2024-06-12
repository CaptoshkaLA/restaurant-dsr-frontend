import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addDish, updateDish, deleteDish, fetchDishes } from '../../store/dishSlice';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import {ThunkDispatch} from "@reduxjs/toolkit";

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

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const onSubmit = (data: DishFormData) => {
    dispatch(addDish(data));
    reset();
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
      <Typography variant="h6" gutterBottom>
        Current Dishes
      </Typography>
      <Grid container spacing={2}>
        {dishes.map((dish) => (
          <Grid item xs={12} key={dish.id}>
            <Typography variant="body1">{dish.name}</Typography>
            <Button variant="contained" color="secondary" onClick={() => dispatch(deleteDish(dish.id))}>
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DishForm;
