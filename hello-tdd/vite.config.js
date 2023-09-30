import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react({ fastRefresh: false })],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/tests/main.test.jsx"],
	},
	server: {
		open: true,
		port: 3000,
	},
});
