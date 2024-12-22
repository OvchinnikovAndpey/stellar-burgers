import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IIngredientsState {
  data: TIngredient[];
  loading: boolean;
  error: boolean;
}

const initialState: IIngredientsState = {
  data: [],
  loading: false,
  error: false
};

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

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredient/get',
  async () => getIngredientsApi()
);

// Добавляем селекторы
export const selectIngredientsData = (state: { ingredients: IIngredientsState }) => state.ingredients.data;
export const selectIngredientsLoading = (state: { ingredients: IIngredientsState }) => state.ingredients.loading;
export const selectIngredientsError = (state: { ingredients: IIngredientsState }) => state.ingredients.error;

export default ingredientsSlice.reducer;