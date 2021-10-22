import { createRule } from '../utils'

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
