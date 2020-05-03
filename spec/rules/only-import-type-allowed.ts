import { TSESLint } from '@typescript-eslint/experimental-utils'

import rule from '../../dist/rules/only-import-type-allowed'

const messageId = 'onlyImportTypeAllowed'

const ruleTester = new TSESLint.RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    tsconfigRootDir: './src',
    project: './tsconfig.eslint.json'
  },
  parser: require.resolve('@typescript-eslint/parser')
})

ruleTester.run('only-import-type-allowed', rule, {
  valid: [
    `import type { foo } from 'foo'`,
    `import type * as foo from 'foo'`,
    `import type foo from 'foo'`,
  ],
  invalid: [
    {
      code: `import { foo } from 'foo'`,
      errors: [
        {
          messageId
        }
      ]
    },
    {
      code: `import * as foo from 'foo'`,
      errors: [
        {
          messageId
        }
      ]
    },
    {
      code: `import foo from 'foo'`,
      errors: [
        {
          messageId
        }
      ]
    },
  ]
})
