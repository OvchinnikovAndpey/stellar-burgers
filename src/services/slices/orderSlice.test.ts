import orderReducer, { initiateOrder, getUserOrderHistory } from './OrderSlice';
import { OrderState } from './OrderSlice';

describe('Срез заказов', () => {
  const initialState: OrderState = {
    currentOrder: null,
    orderHistory: null,
    isOrderLoading: false,
    hasOrderError: false,
    isOrderHistoryLoading: false,
    hasOrderHistoryError: false
  };

  it('должен обрабатывать createOrder.pending', () => {
    const action = { type: initiateOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOrderLoading: true,
      hasOrderError: false
    });
  });

  it('должен обрабатывать createOrder.fulfilled', () => {
    const order = { id: '123', ingredients: [] };
    const action = { type: initiateOrder.fulfilled.type, payload: order };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      currentOrder: order,
      isOrderLoading: false
    });
  });

  it('должен обрабатывать createOrder.rejected', () => {
    const action = { type: initiateOrder.rejected.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOrderLoading: false,
      hasOrderError: true
    });
  });

  it('должен обрабатывать fetchUserOrders.fulfilled', () => {
    const ordersHistory = [{ id: 'order1' }, { id: 'order2' }];
    const action = {
      type: getUserOrderHistory.fulfilled.type,
      payload: ordersHistory
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderHistory: ordersHistory,
      isOrderHistoryLoading: false
    });
  });
});
