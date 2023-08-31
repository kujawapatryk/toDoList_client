import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '15uyjs',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
