import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  forgotPasswoerd,
  resetPassword,
  getUser
} from './UserSlice';

describe('User Slice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthorized: false,
    isLoading: false,
    error: null
  };

  it('should return the initial state for an unknown action', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle registerUser.fulfilled', () => {
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

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      isLoading: false
    });
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
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

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      isLoading: false
    });
  });

  it('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle logoutUser.fulfilled', () => {
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

  it('should handle logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      isLoading: false
    });
  });

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.fulfilled', () => {
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

  it('should handle updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      isLoading: false
    });
  });

  it('should handle forgotPasswoerd.pending', () => {
    const action = { type: forgotPasswoerd.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle forgotPasswoerd.fulfilled', () => {
    const action = { type: forgotPasswoerd.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  it('should handle forgotPasswoerd.rejected', () => {
    const action = {
      type: forgotPasswoerd.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isLoading: false
    });
  });

  it('should handle resetPassword.pending', () => {
    const action = { type: resetPassword.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle resetPassword.fulfilled', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  it('should handle resetPassword.rejected', () => {
    const action = {
      type: resetPassword.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isLoading: false
    });
  });

  it('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getUser.fulfilled', () => {
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

  it('should handle getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      isLoading: false
    });
  });
});
