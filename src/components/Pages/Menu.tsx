import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchDishes } from '../../store/dishSlice';
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import {ThunkDispatch} from "@reduxjs/toolkit";

const Menu: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dishes = useSelector((state: RootState) => state.dishes.dishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Our Menu
      </Typography>
      <Grid container spacing={2}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card>
              <CardMedia component="img" alt={dish.name} height="140" image={dish.imageUrl} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {dish.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dish.shortDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Menu;
