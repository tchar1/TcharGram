import { User } from '@/data/interface.data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateFollowStatus: (state, action: PayloadAction<string>) => {
      if (state.user) {
        const targetUserId = action.payload;
        const isCurrentlyFollowing = state.user.following.includes(targetUserId);
        
        if (isCurrentlyFollowing) {
          state.user.following = state.user.following.filter(id => id !== targetUserId);
        } else {
          state.user.following.push(targetUserId);
        }
      }
    },
  },
});

export const { setAuthUser, logout, updateFollowStatus } = authSlice.actions;
export default authSlice.reducer;