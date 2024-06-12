import React from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { deleteDish } from '../../store/dishSlice';
import { ThunkDispatch } from "@reduxjs/toolkit";

interface CurrentDishesProps {
  dishes: any[];
}

const CurrentDishes: React.FC<CurrentDishesProps> = ({ dishes }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleDelete = (id: number) => {
    dispatch(deleteDish(id));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dishes.map((dish) => (
          <TableRow key={dish.id}>
            <TableCell>{dish.name}</TableCell>
            <TableCell>{dish.description}</TableCell>
            <TableCell>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(dish.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CurrentDishes;
