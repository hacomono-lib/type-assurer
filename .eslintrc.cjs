module.exports = {
  root: true,
  extends: ['@hacomono/vue3', 'turbo', 'plugin:mdx/recommended'],
  parserOptions: {
    // project: ['tsconfig.json', './packages/**/tsconfig.json', './packages/**/tsconfig.*.json']
    project: null
  },
  settings: {
    'mdx/code-blocks': true
  }
}
