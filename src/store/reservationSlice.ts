import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Reservation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status?: 'PENDING' | 'PROCESSED';
}

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Getting a token from localStorage
  },
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservations`, authHeader);
    return response.data;
  }
);

export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async (reservation: Reservation) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/reservations`, reservation, authHeader);
    return response.data;
  }
);

export const updateReservationStatus = createAsyncThunk(
  'reservations/updateReservationStatus',
  async ({ id, status }: { id: number; status: 'PENDING' | 'PROCESSED' }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/reservations/${id}/status`, { status }, authHeader);
    return response.data;
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reservations';
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      });
  },
});

export default reservationSlice.reducer;
