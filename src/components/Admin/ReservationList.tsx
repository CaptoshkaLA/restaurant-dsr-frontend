import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,} from '@mui/material';
import { updateReservationStatus, updateReservationDateTime } from '../../store/reservationSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface ReservationListProps {
  reservations: any[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  const handleStatusChange = (id: number, status: 'CONFIRMED' | 'REJECTED') => {
    dispatch(updateReservationStatus({ id, status }));
  };

  const handleDateTimeChange = (id: number) => {
    dispatch(updateReservationDateTime({ id, date: newDate, time: newTime }));
    setOpen(false);
  };

  const handleOpenDialog = (reservation: any) => {
    setSelectedReservation(reservation);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedReservation(null);
    setNewDate('');
    setNewTime('');
    setOpen(false);
  };

  return (
    <>
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
              <TableCell>
                {new Date(reservation.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </TableCell>
              <TableCell>{reservation.guests}</TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}>
                  Mark as Confirmed
                </Button>
                <Button onClick={() => handleStatusChange(reservation.id, 'REJECTED')}>
                  Mark as Rejected
                </Button>
                <Button onClick={() => handleOpenDialog(reservation)}>Change Date/Time</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for updating date and time */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Update Date and Time</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="time"
            label="Time"
            type="time"
            fullWidth
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDateTimeChange(selectedReservation.id)} disabled={!newDate || !newTime}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationList;
