import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Dish {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  recipe: string;
  ingredients: string;
  imageUrl: string;
}

interface DishState {
  dishes: Dish[];
  selectedDish: Dish | null;
  loading: boolean;
  error: string | null;
}

const initialState: DishState = {
  dishes: [],
  selectedDish: null,
  loading: false,
  error: null,
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Getting a token from localStorage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Общий обработчик ошибок для всех асинхронных действий
const handleAsyncError = (state: DishState, action: any) => {
  state.loading = false;
  state.error = action.payload || 'Request failed';
};

export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dishes`, getAuthHeader());
      return response.data;
    } catch (error) {
      return Promise.reject('Failed to fetch dishes');
    }
  }
);

export const fetchDish = createAsyncThunk(
  'dishes/fetchDish',
  async (id: number) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dishes/${id}`, getAuthHeader());
      return response.data;
    } catch (error) {
      return Promise.reject('Failed to fetch dish');
    }
  }
);

export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (dish: Omit<Dish, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/dishes`, dish, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add dish');
    }
  }
);

export const updateDish = createAsyncThunk(
  'dishes/updateDish',
  async (dish: Dish, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/dishes/${dish.id}`, dish, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update dish');
    }
  }
);

export const deleteDish = createAsyncThunk(
  'dishes/deleteDish',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/dishes/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete dish');
    }
  }
);

const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        handleAsyncError(state, action);
      })
      .addCase(fetchDish.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedDish = null;
      })
      .addCase(fetchDish.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDish = action.payload;
      })
      .addCase(fetchDish.rejected, (state, action) => {
        handleAsyncError(state, action);
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
      })
      .addCase(addDish.rejected, (state, action) => {
        handleAsyncError(state, action);
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        const index = state.dishes.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.dishes[index] = action.payload;
        }
      })
      .addCase(updateDish.rejected, (state, action) => {
        handleAsyncError(state, action);
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        handleAsyncError(state, action);
      });
  },
});

export default dishSlice.reducer;
