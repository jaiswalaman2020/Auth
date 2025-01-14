import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure 'util' or other Node.js modules aren't resolved
      util: false,
    },
  },
  optimizeDeps: {
    exclude: ["passport"], // Exclude server-side modules
  },
});
