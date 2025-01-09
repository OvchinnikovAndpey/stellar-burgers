import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  forgotPasswoerd,
  resetPassword,
  getUser
} from './UserSlice';

describe('UserSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthorized: false,
    isLoading: false,
    error: null
  };

  it('должен вернуть начальное состояние для неизвестного действия', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен обработать registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать registerUser.fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user,
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
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

  it('должен обработать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать loginUser.fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user,
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать loginUser.rejected', () => {
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

  it('должен обработать logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(
      {
        ...initialState,
        user: { email: 'test@test.com', name: '' },
        isAuthorized: true
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthorized: false,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
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

  it('должен обработать updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать updateUser.fulfilled', () => {
    const user = { id: 'user123', email: 'updated@test.com' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
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

  it('должен обработать forgotPasswoerd.pending', () => {
    const action = { type: forgotPasswoerd.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать forgotPasswoerd.fulfilled', () => {
    const action = { type: forgotPasswoerd.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать forgotPasswoerd.rejected', () => {
    const action = {
      type: forgotPasswoerd.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Ошибка',
      isLoading: false
    });
  });

  it('должен обработать resetPassword.pending', () => {
    const action = { type: resetPassword.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать resetPassword.fulfilled', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать resetPassword.rejected', () => {
    const action = {
      type: resetPassword.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Ошибка',
      isLoading: false
    });
  });

  it('должен обработать getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать getUser.fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = {
      type: getUser.fulfilled.type,
      payload: { user }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
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
