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
  status?: 'PENDING' | 'CONFIRMED' | 'REJECTED';
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

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Getting a token from localStorage
    },
  };
};

// Общий обработчик ошибок для всех асинхронных действий
const handleAsyncError = (state: ReservationState, action: any) => {
  state.loading = false;
  state.error = action.payload || 'Request failed';
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservations`, getAuthHeader());
    return response.data;
  }
);

export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async (reservation: Reservation, { rejectWithValue }) => {
    // console.log(response)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reservations`, reservation, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add reservation');
    }
  }
);

export const updateReservationStatus = createAsyncThunk(
  'reservations/updateReservationStatus',
  async ({ id, status }: { id: number; status: 'PENDING' | 'CONFIRMED' | 'REJECTED' }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/reservations/${id}/status`, { status }, getAuthHeader());
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
        handleAsyncError(state, action);
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      })
      .addCase(addReservation.rejected, (state, action) => {
        handleAsyncError(state, action);
      });
  },
});

export default reservationSlice.reducer;
