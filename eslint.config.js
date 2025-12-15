import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "prefer-const": "off",
      "no-constant-binary-expression": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-prototype-builtins": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React luôn lên đầu tiên
            ["^react", "^react-dom"],

            // Thư viện bên ngoài (npm packages)
            ["^@?[a-zA-Z]"],

            // Alias nội bộ kiểu "_" (ví dụ _constants, _controls)
            ["^_"],

            // Import alias nội bộ (ví dụ @hooks, @components)
            ["^@"],

            // Import tương đối cùng thư mục
            ["^\\./"],

            // Import từ thư mục cha 1 cấp
            ["^\\.\\./"],

            // Import từ thư mục cha nhiều cấp hơn (../../, ../../../, ...)
            ["^\\.\\./\\.\\./"],

            // Import plugin
            ["^\\u0000"],

            // Import assets (ảnh, svg…)
            ["\\.(png|jpg|jpeg|sv|webp)$"],

            // CSS / SCSS / LESS
            ["\\.s?css$", "\\.less$"],
          ],
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-extra-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "none",
          ignoreRestSiblings: true,
          // args: 'after-used',
          // argsIgnorePattern: '^_',
        },
      ],
    },
  }
);
