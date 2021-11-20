import { ESLintUtils } from '@typescript-eslint/experimental-utils'

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/plantain-00/eslint-plugin-plantain#readme`
)

type MessageIds = 'onlyImportTypeAllowed'

export default createRule<[], MessageIds>({
  name: 'only-import-type-allowed',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Only import type is allowed',
      recommended: false
    },
    messages: {
      onlyImportTypeAllowed: 'Only import type is allowed.'
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.importKind === 'value') {
          context.report({
            messageId: 'onlyImportTypeAllowed',
            node
          })
        }
      }
    }
  }
})
