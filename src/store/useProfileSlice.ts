// src/features/profileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store"; // Import the correct path for RootState

interface ProfileState {
  completed: boolean;
}

const initialState: ProfileState = {
  completed: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCompleted: (state) => {
      state.completed = true;
    },
  },
});

export const { setCompleted } = profileSlice.actions;

// Selector with explicit typing of RootState
export const selectCompleted = (state: RootState): boolean =>
  state.profile.completed;

export default profileSlice.reducer;
