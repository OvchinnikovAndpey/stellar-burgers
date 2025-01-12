import feedInfoReducer, {
  getFeedsThunk,
  initialState,
  addBun,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from './FeedInfoSlice';
import { TOrder } from '@utils-types';

describe('FeedInfoSlice', () => {
  it('должен обрабатывать getFeeds.pending', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = feedInfoReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен обрабатывать getFeeds.fulfilled', () => {
    const feeds = {
      orders: [
        {
          _id: 'order1',
          name: 'Order1',
          status: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }
      ],
      total: 100,
      totalToday: 10
    };
    const action = { type: getFeedsThunk.fulfilled.type, payload: feeds };
    const state = feedInfoReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feeds.orders,
      total: feeds.total,
      totalToday: feeds.totalToday,
      loading: false,
      error: null
    });
  });

  it('должен обрабатывать getFeeds.rejected', () => {
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = feedInfoReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка'
    });
  });

  it('должен обрабатывать addBun', () => {
    const newOrders: TOrder[] = [
      {
        _id: 'order2',
        name: 'Bun',
        status: '',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      }
    ];
    const action = addBun(newOrders);
    const state = feedInfoReducer(initialState, action);
    expect(state.orders).toEqual(newOrders);
  });

  it('должен возвращать заказы с помощью getOrdersFeeds', () => {
    const state = {
      feedInfo: {
        ...initialState,
        orders: [
          {
            _id: 'order3',
            name: 'Order3',
            status: '',
            createdAt: '',
            updatedAt: '',
            number: 0,
            ingredients: []
          }
        ]
      }
    };
    expect(getOrdersFeeds(state)).toEqual(state.feedInfo.orders);
  });

  it('должен возвращать total с помощью getTotalFeeds', () => {
    const state = {
      feedInfo: {
        ...initialState,
        total: 200
      }
    };
    expect(getTotalFeeds(state)).toBe(state.feedInfo.total);
  });

  it('должен возвращать totalToday с помощью getTotalTodayFeeds', () => {
    const state = {
      feedInfo: {
        ...initialState,
        totalToday: 20
      }
    };
    expect(getTotalTodayFeeds(state)).toBe(state.feedInfo.totalToday);
  });
});
