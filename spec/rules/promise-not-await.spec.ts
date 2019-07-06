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
      await Promise.resolve(1)
      return 1
    }
    `,
    `
    async function foo() {
      return Promise.resolve(1)
    }
    `
  ],
  invalid: [
    {
      code: `
      async function foo() {
        Promise.resolve(1)
        return 1
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
        Promise.resolve(1)
        return 1
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
      if (Promise.resolve(1)) {
        console.info(1)
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
      const b = Promise.resolve(1)
      if (b) {
        console.info(2)
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
      const b = Promise.resolve(1)
      while (b) {
        console.info(2)
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
