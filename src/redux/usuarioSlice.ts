import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUsuarioApi = {
  nome: "",
  email: "",
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUsuario: (_state, action: PayloadAction<IUsuarioApi>) => {
      return action.payload;
    },
    clearUsuario: () => {
      return initialState;
    },
  },
});

export const { setUsuario, clearUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
