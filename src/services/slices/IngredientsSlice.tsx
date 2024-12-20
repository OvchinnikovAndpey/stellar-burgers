import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IIngredientsState {
  [x: string]: any;
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
  'ingredient',
  async () => getIngredientsApi()
);

export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
