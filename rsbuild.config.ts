import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { parsed } = loadEnv();

export default defineConfig({
	source: {
		alias: {
			"@": path.join(__dirname, "./src"),
		},
	},
	html: {
		meta: {
			viewport:
				"width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0",
		},
	},
	plugins: [pluginReact()],
	server: {
		port: Number(parsed.PORT),
		historyApiFallback: true,
		proxy: {
			"/api": {
				changeOrigin: true,
				target: parsed.PROXY_TARGET,
			},
		},
	},
});
