import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default [
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules
    }
  },
  {
    ignores: ["dist/", "node_modules/", ".next/", "storybook-static/"]
  }
];
