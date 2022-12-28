module.exports = {
  extends: ["@gazzati/eslint-config-node"],
  rules: {
    "@typescript-eslint/require-await": "off"
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"]
  }
}
