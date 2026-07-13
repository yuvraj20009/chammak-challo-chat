import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                content: "src/main.js"
            },
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "[name].[ext]"
            }
        }
    }
});