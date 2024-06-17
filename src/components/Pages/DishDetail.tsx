import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { fetchDish, updateDish } from '../../store/dishSlice';
import { Container, Typography, Card, CardContent, CardMedia, Box, CircularProgress, Divider, Button, TextField, } from '@mui/material';
import { ThunkDispatch } from '@reduxjs/toolkit';

const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dish = useSelector((state: RootState) => state.dishes.selectedDish);
  const loading = useSelector((state: RootState) => state.dishes.loading);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDish, setEditedDish] = useState<any>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchDish(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dish) {
      setEditedDish(dish);
    }
  }, [dish]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDish({ ...editedDish, [name]: value });
  };

  const handleSave = async () => {
    if (editedDish) {
      await dispatch(updateDish(editedDish));
      setIsEditing(false);
      dispatch(fetchDish(Number(id)));
    }
  };

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
            {isEditing ? (
              <TextField
                fullWidth
                name="name"
                value={editedDish.name}
                onChange={handleInputChange}
              />
            ) : (
              dish.name
            )}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Short Description
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="shortDescription"
              value={editedDish.shortDescription}
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1" color="text.primary" paragraph>
              {dish.shortDescription}
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Description
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="description"
              value={editedDish.description}
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1" color="text.primary" paragraph>
              {dish.description}
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Ingredients
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="ingredients"
              value={editedDish.ingredients}
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1" color="text.primary" paragraph>
              {dish.ingredients}
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Recipe
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="recipe"
              value={editedDish.recipe}
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1" color="text.primary" paragraph>
              {dish.recipe}
            </Typography>
          )}
        </CardContent>
      </Card>
      {localStorage.getItem('token') && (
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleEditToggle} variant="contained">
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && (
            <Button onClick={handleSave} variant="contained" color="primary" sx={{ ml: 2 }}>
              Save
            </Button>
          )}
        </Box>
      )}
    </Container>
  ) : (
    <Typography>Dish not found</Typography>
  );
};

export default DishDetail;
