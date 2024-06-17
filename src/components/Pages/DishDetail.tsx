import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { fetchDish } from '../../store/dishSlice';
import { Container, Typography, Card, CardContent, CardMedia, Box, CircularProgress, Divider } from '@mui/material';
import { ThunkDispatch } from '@reduxjs/toolkit';

const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dish = useSelector((state: RootState) => state.dishes.selectedDish);
  const loading = useSelector((state: RootState) => state.dishes.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchDish(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return dish ? (
    <Container sx={{ marginTop: '2rem' }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          alt={dish.name}
          image={dish.imageUrl}
          sx={{ width: { xs: '100%', md: '50%' }, height: 'auto' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" component="div" gutterBottom>
            {dish.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Short Description
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {dish.shortDescription}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {dish.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Ingredients
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {dish.ingredients}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Recipe
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {dish.recipe}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  ) : (
    <Typography>Dish not found</Typography>
  );
};

export default DishDetail;
