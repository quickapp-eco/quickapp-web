module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 2019,
  },
  globals: {
    $app_require$: "readonly",
  },
  rules: {
    "import/no-unresolved": [2, { ignore: ["^@"] }],
    "no-param-reassign": [2, { props: false }],
    quotes: [
      1,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
};
