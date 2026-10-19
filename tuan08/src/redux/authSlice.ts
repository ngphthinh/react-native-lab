import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError, authService, User } from '../services/authService';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface Session {
  token: string;
  user: User;
}
interface Credentials {
  email: string;
  password: string;
}
interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
}

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : 'Có lỗi xảy ra');

const saveSession = (token: string, user: User) =>
  AsyncStorage.multiSet([
    [TOKEN_KEY, token],
    [USER_KEY, JSON.stringify(user)],
  ]);

const clearSession = () => AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);

export const login = createAsyncThunk<Session, Credentials, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { token, user } = await authService.login(email, password);
      await saveSession(token, user);
      return { token, user };
    } catch (err) {
      return rejectWithValue(errorMessage(err));
    }
  }
);

export const register = createAsyncThunk<Session, Credentials, { rejectValue: string }>(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authService.register(email, password);
      const { token, user } = await authService.login(email, password);
      await saveSession(token, user);
      return { token, user };
    } catch (err) {
      return rejectWithValue(errorMessage(err));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await clearSession();
});

export const hydrateAuth = createAsyncThunk<Session | null>('auth/hydrate', async () => {
  const [[, token], [, userJson]] = await AsyncStorage.multiGet([TOKEN_KEY, USER_KEY]);
  if (!token) return null;

  try {
    const { user } = await authService.me(token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return { token, user };
  } catch (err) {
    if (err instanceof ApiError && err.network && userJson) {
      return { token, user: JSON.parse(userJson) as User }; // offline: tạm tin token đã lưu
    }
    await clearSession();
    return null;
  }
});

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  hydrated: false,
};

const onPending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};
const onSuccess = (state: AuthState, { payload }: { payload: Session }) => {
  state.loading = false;
  state.token = payload.token;
  state.user = payload.user;
};
const onFail = (state: AuthState, { payload }: { payload?: string }) => {
  state.loading = false;
  state.error = payload ?? 'Có lỗi xảy ra';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, onPending)
      .addCase(login.fulfilled, onSuccess)
      .addCase(login.rejected, onFail)
      .addCase(register.pending, onPending)
      .addCase(register.fulfilled, onSuccess)
      .addCase(register.rejected, onFail)
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(hydrateAuth.fulfilled, (state, { payload }) => {
        if (payload) {
          state.token = payload.token;
          state.user = payload.user;
        }
        state.hydrated = true;
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.hydrated = true;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;