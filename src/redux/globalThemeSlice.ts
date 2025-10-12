import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThemeState {
  darkMode: boolean;
}

const initialState: IThemeState = {
  darkMode: true,
};

const globalThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = globalThemeSlice.actions;
export default globalThemeSlice.reducer;
