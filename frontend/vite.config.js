import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: ["taskflow-production-45e7.up.railway.app"],
    },
});
