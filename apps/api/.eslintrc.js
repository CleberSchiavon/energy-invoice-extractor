/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/api'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
