import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import snackBarReducer from "./snackBarSlice";
import drawerReducer from "./drawerSlice";
import usuarioReducer from "./usuarioSlice";
import globalThemeSlice from "./globalThemeSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    snackBar: snackBarReducer,
    drawer: drawerReducer,
    usuario: usuarioReducer,
    theme: globalThemeSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
