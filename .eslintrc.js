module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: "module"
  },
  parser: "babel-eslint",
  env: {
    node: true
  },
  globals: {
    angular: false,
    define: false,
    describe: false,
    document: false,
    expect: false,
    it: false,
    require: false
  },
  settings: {
    react: {
      version: "0.14.0"
    }
  },
  rules: {
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["warn", "unix"],
    "object-curly-spacing": ["warn", "always"],
    "max-lines": ["warn", 300],
    "max-len": ["warn", 120],
    "no-console": ["warn"],
    "no-mixed-operators": ["warn", {
      "groups": [
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      "allowSamePrecedence": true
    }],
    "no-multi-spaces": ["warn"],
    "no-use-before-define": ["warn", { "functions": false, "classes": false, "variables": false }],
    "no-useless-return": ["warn"],
    "no-underscore-dangle": ["warn", { "allow": ["_id"] }],
    "no-restricted-syntax": ["warn"],
    "operator-linebreak": ["warn", "before"],
    "prefer-promise-reject-errors": ["warn"],
    "padded-blocks": ["warn", { "blocks": "never", "switches": "never", "classes": "never" }],
    "semi": ["warn", "always"]
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
}
