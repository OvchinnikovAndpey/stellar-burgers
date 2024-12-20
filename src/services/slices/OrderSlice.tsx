import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { clearConstructor } from './BurgerConstructorSlice';

export interface OrderState {
  currentOrder: TOrder | null;
  orderHistory: TOrder[] | null;
  isOrderLoading: boolean;
  hasOrderError: boolean;
  isOrderHistoryLoading: boolean;
  hasOrderHistoryError: boolean;
}

const initialOrderState: OrderState = {
  currentOrder: null,
  orderHistory: null,
  isOrderLoading: false,
  hasOrderError: false,
  isOrderHistoryLoading: false,
  hasOrderHistoryError: false
};

// создания нового заказа
export const initiateOrder = createAsyncThunk<TOrder, string[]>(
  'order/initiate',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(clearConstructor());
      return response.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  получение истории заказов пользователя
export const getUserOrderHistory = createAsyncThunk<TOrder[]>(
  'order/getUserOrderHistory',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// AsyncThunk для получения заказа по номеру
export const getOrderDetailsByNumber = createAsyncThunk<TOrder, number>(
  'order/getOrderDetailsByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi(); // Предполагается, что это возвращает TOrder[]
      const order = orders.find((order) => order.number === number);
      if (!order) throw new Error('Заказ не найден');
      return order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    closeOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка создания заказа
      .addCase(initiateOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.hasOrderError = false;
      })
      .addCase(initiateOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.isOrderLoading = false;
      })
      .addCase(initiateOrder.rejected, (state) => {
        state.hasOrderError = true;
        state.isOrderLoading = false;
      })

      // Обработка получения истории заказов
      .addCase(getUserOrderHistory.pending, (state) => {
        state.isOrderHistoryLoading = true;
        state.hasOrderHistoryError = false;
      })
      .addCase(getUserOrderHistory.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.isOrderHistoryLoading = false;
      })
      .addCase(getUserOrderHistory.rejected, (state) => {
        state.hasOrderHistoryError = true;
        state.isOrderHistoryLoading = false;
      })

      // Обработка получения заказа по номеру
      .addCase(getOrderDetailsByNumber.pending, (state) => {
        state.isOrderHistoryLoading = true;
        state.hasOrderHistoryError = false;
      })
      .addCase(getOrderDetailsByNumber.fulfilled, (state, action) => {
        state.orderHistory = [...(state.orderHistory || []), action.payload];
        state.isOrderHistoryLoading = false;
      })
      .addCase(getOrderDetailsByNumber.rejected, (state) => {
        state.hasOrderHistoryError = true;
        state.isOrderHistoryLoading = false;
      });
  }
});

export const { closeOrder } = orderSlice.actions;
export default orderSlice.reducer;
