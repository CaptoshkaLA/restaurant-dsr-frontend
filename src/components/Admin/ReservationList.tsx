import React from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { updateReservationStatus } from '../../store/reservationSlice';
import {ThunkDispatch} from "@reduxjs/toolkit";

interface ReservationListProps {
  reservations: any[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleStatusChange = (id: number, status: 'PENDING' | 'PROCESSED') => {
    dispatch(updateReservationStatus({ id, status }));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Guests</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.name}</TableCell>
            <TableCell>{reservation.email}</TableCell>
            <TableCell>{reservation.phone}</TableCell>
            <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(reservation.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
            <TableCell>{reservation.guests}</TableCell>
            <TableCell>{reservation.status}</TableCell>
            <TableCell>
              <Button
                onClick={() => handleStatusChange(reservation.id, reservation.status === 'PENDING' ? 'PROCESSED' : 'PENDING')}
              >
                {reservation.status === 'PENDING' ? 'Mark as Processed' : 'Mark as Pending'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationList;
