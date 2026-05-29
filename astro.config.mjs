import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  base: import.meta.env.PROD ? "/claytube" : "/",
});
