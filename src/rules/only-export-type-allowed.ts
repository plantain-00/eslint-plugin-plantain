import { ESLintUtils } from '@typescript-eslint/experimental-utils'

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/plantain-00/eslint-plugin-plantain#readme`
)

type MessageIds = 'onlyExportTypeAllowed'

export default createRule<[], MessageIds>({
  name: 'only-export-type-allowed',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Only export type is allowed',
      recommended: false
    },
    messages: {
      onlyExportTypeAllowed: 'Only export type is allowed.'
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportAllDeclaration(node) {
        if (node.exportKind === 'value') {
          context.report({
            messageId: 'onlyExportTypeAllowed',
            node
          })
        }
      },
      ExportNamedDeclaration(node) {
        if (node.exportKind === 'value') {
          context.report({
            messageId: 'onlyExportTypeAllowed',
            node
          })
        }
      }
    }
  }
})
