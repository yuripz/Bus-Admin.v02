module.exports = {
  root: true,
  extends: ["airbnb", "react", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  "globals": {
    "global": true,
    "localStorage": true,
    "fetch": true,
    "sessionStorage": true,
    "HTMLDivElement": true,
    "HTMLInputElement": true,
    "document": true,
  },
  rules: {
    "camelcase": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-use-before-define": "off",
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/prop-types": "off",
    "no-redeclare": "off",
    "no-unused-vars": "off",
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
