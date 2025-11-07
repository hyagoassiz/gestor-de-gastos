import { SnackBar } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SnackBar = {
  message: "",
  type: "success",
  open: false,
};

type SnackBarPayload = Omit<SnackBar, "open">;

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    showSnackBar: (_, action: PayloadAction<SnackBarPayload>): SnackBar => {
      return {
        message: action.payload.message,
        type: action.payload.type,
        open: true,
      };
    },
    closeSnackBar: (state): void => {
      state.open = false;
    },
  },
});

export const { showSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
