import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  /* ... */
};

// Uncomment below while using proxy
// const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), "VITE_");

// https://vite.dev/config/
export default defineConfig({
  // Uncomment below while using proxy
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: env.VITE_BASE_API,
  //       changeOrigin: true,
  //       secure: false, //note: If the backend uses https, set this to true
  //     },
  //   },
  // },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
