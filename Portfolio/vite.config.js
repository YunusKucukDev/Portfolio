import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    outDir: "../Portfolio.Api/Portfolio.Api/wwwroot",
    chunkSizeWarningLimit: 1024,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
});
