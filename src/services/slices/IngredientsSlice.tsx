import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

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

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredient/get',
  async () => {
    const response = await getIngredientsApi();
    // console.log("API response for ingredients:", response);
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        // console.log("Fetching ingredients...");
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          // console.log("Ingredients loaded:", action.payload);
          state.loading = false;
          state.error = false;
          state.data = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        // console.error("Failed to load ingredients:", action.error.message);
        state.loading = false;
        state.error = true;
      });
  }
});

// Селекторы для извлечения данных из состояния
export const selectIngredientsData = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.data;
export const selectIngredientsLoading = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.loading;
export const selectIngredientsError = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.error;

export default ingredientsSlice.reducer;
