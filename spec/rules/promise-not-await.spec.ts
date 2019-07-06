import { TSESLint } from '@typescript-eslint/experimental-utils'

import rule from '../../dist/rules/promise-not-await'

const messageId = 'promiseNotAwait'

const ruleTester = new TSESLint.RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    tsconfigRootDir: './src',
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser'
})

ruleTester.run('promise-not-await', rule, {
  valid: [
    `
    async function foo() {
      await bar()
      return 1
    }
    function bar() {
      return Promise.resolve(1)
    }
    `,
    `
    async function foo() {
      return bar()
    }
    function bar() {
      return Promise.resolve(1)
    }
    `
  ],
  invalid: [
    {
      code: `
      async function foo() {
        bar()
        return 1
      }
      function bar() {
        return Promise.resolve(1)
      }
      `,
      errors: [
        {
          messageId
        }
      ]
    },
    {
      code: `
      function foo() {
        bar()
        return 1
      }
      function bar() {
        return Promise.resolve(1)
      }
      `,
      errors: [
        {
          messageId
        }
      ]
    }
  ]
})
