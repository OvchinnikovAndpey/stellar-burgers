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

export const ingredientsSlice = createSlice({
  name: 'ingredients',
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
  'ingredients',
  async () => getIngredientsApi()
);

export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
