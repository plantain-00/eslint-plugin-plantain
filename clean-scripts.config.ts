const tsFiles = `"src/**/*.ts" "spec/**/*.ts"`

export default {
  build: [
    'rimraf dist/',
    'tsc -p src/tsconfig.json'
  ],
  lint: {
    ts: `eslint --ext .js,.ts ${tsFiles}`,
    export: `no-unused-export ${tsFiles} --strict`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src/tsconfig.json --strict'
  },
  test: [
  ],
  fix: `eslint --ext .js,.ts --fix ${tsFiles}`
}
