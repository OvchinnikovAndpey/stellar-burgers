import userReducer, { loginUser } from './UserSlice';
import { IUserState } from './UserSlice';

describe('Срез пользователя', () => {
  const initialState: IUserState = {
    user: null,
    isAuthChecked: false,
    isAuthorized: false,
    isLoading: false,
    error: null
  };

  it('должен обрабатывать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать loginUser.fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      isLoading: false
    });
  });

  it('должен обрабатывать loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Ошибка',
      isAuthorized: false,
      isLoading: false
    });
  });
});