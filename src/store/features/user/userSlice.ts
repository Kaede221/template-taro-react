import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  token: string;
}

const initialState: UserState = {
  name: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (
      state,
      action: PayloadAction<{
        name: string;
      }>,
    ) => {
      state.name = action.payload.name;
    },

    setToken: (
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) => {
      state.token = action.payload.token;
    },

    resetUserInfo: () => initialState,
  },
});

export const { setName, setToken, resetUserInfo } = userSlice.actions;

export default userSlice.reducer;
