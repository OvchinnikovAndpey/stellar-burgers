import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

// Определение интерфейса состояния
export interface IIngredientsState {
  [x: string]: any;
  data: TIngredient[];
  loading: boolean;
  error: boolean;
}

// Инициализация состояния
const initialState: IIngredientsState = {
  data: [],
  loading: false,
  error: false
};

// Создание слайса
const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = false;
          state.data = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

// Асинхронное действие для получения ингредиентов
export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredient',
  async () => getIngredientsApi()
);

export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
