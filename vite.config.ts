import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 👈 importa o path

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/gestor-de-gastos/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 cria o alias "@"
    },
  },
});
