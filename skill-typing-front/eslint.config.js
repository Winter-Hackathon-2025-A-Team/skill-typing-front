import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";
import testingLibrary from "eslint-plugin-testing-library";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 全体の無視設定
  {
    ignores: ["build/", "public/", "node_modules", ".react-router/"],
  },
  // すべての JS/TS ファイルに対する共通設定
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  // ESLint の推奨設定
  pluginJs.configs.recommended,
  // TypeScript ESLint の推奨設定
  ...tseslint.configs.recommended,
  // React 用の Flat 推奨設定
  pluginReact.configs.flat.recommended,
  // Prettier との競合を解消する設定
  eslintConfigPrettier,
  // .react-router/types 以下のファイルに対するルールの上書き
  {
    files: [".react-router/types/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
    },
  },
  // テストファイル向けの設定：Vitest および Testing Library の推奨設定
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    ...testingLibrary.configs["flat/react"],
  },
];
