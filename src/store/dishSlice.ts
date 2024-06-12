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
  loading: boolean;
  error: string | null;
}

const initialState: DishState = {
  dishes: [],
  loading: false,
  error: null,
};

const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Получаем токен из localStorage
  },
};

export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dishes`, authHeader); // Передаем заголовок
    return response.data;
  }
);

export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (dish: Omit<Dish, 'id'>) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/dishes`, dish, authHeader); // Передаем заголовок
    return response.data;
  }
);

export const updateDish = createAsyncThunk(
  'dishes/updateDish',
  async (dish: Dish) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/dishes/${dish.id}`, dish, authHeader); // Передаем заголовок
    return response.data;
  }
);

export const deleteDish = createAsyncThunk(
  'dishes/deleteDish',
  async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/dishes/${id}`, authHeader); // Передаем заголовок
    return id;
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
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dishes';
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        const index = state.dishes.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.dishes[index] = action.payload;
        }
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter((d) => d.id !== action.payload);
      });
  },
});

export default dishSlice.reducer;
