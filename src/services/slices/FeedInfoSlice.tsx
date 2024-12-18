import { getFeedsApi} from '@api';
import { TFeedsResponse } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IFeedInfoState {
    loading: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
    error: string | null;
}

export const initialState: IFeedInfoState = {
    loading: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
};

export const feedInfoSlice = createSlice({
    name: 'feedInfo',
    initialState,
    reducers: {
        addBun: (state, action) => {
            state.orders = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedsApi.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getFeedsApi.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        });
        builder.addCase(getFeedsApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error';
        });
    }
});

export const getFeedsApiThunk = createAsyncThunk<TFeedsResponse>('feedInfo/getFeedsApiThunk', getFeedsApi);

export const { addBun } = feedInfoSlice.actions;

export default feedInfoSlice.reducer;