import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import snackBarReducer from "./snackBarSlice";
import drawerReducer from "./drawerSlice";
import usuarioReducer from "./usuarioSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    snackBar: snackBarReducer,
    drawer: drawerReducer,
    usuario: usuarioReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
