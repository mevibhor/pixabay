module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ["react", "react-hooks", "react-refresh"],

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react-refresh/only-export-components": "warn",

    "no-unused-vars": "warn",
  },

  ignorePatterns: ["node_modules/", "dist/", "vite.config.js"],
};
