module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  semi: false,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
