import ts from 'typescript'
import { TSESTree, ESLintUtils } from '@typescript-eslint/experimental-utils'

import { createRule } from '../utils'

type MessageIds = 'promiseNotAwait'

function findParentFunction(node: ts.Node): ts.Node | undefined {
  const parent = node.parent
  if (ts.isFunctionDeclaration(parent)
    || ts.isFunctionExpression(parent)
    || ts.isArrowFunction(parent)
    || ts.isMethodDeclaration(parent)) {
    return parent
  }
  if (ts.isSourceFile(parent)) {
    return undefined
  }
  return findParentFunction(parent)
}

function findFunction(node: ts.Node) {
  return findParentFunction(node) as ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | ts.MethodDeclaration | undefined
}

export default createRule<[], MessageIds>({
  name: 'promise-not-await',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Requires any statement that returns a Promise to be await',
      category: 'Best Practices',
      recommended: false
    },
    messages: {
      promiseNotAwait: 'Statements that return promises must be await.'
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context)
    const checker = parserServices.program.getTypeChecker()

    function checkTypeIsPromise(
      node: ts.IfStatement | ts.WhileStatement | ts.CallExpression | ts.Identifier,
      type: ts.Type
    ) {
      if (type.symbol && type.symbol.escapedName === 'Promise') {
        context.report({
          messageId: 'promiseNotAwait',
          node: parserServices.tsNodeToESTreeNodeMap.get(node)
        })
      }
    }

    function checkCallExpressionReturnPromise(node: ts.CallExpression) {
      const signature = checker.getResolvedSignature(node)
      if (signature) {
        const returnType = checker.getReturnTypeOfSignature(signature)
        checkTypeIsPromise(node, returnType)
      }
    }

    function checkExpressionReturnPromise(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        checkCallExpressionReturnPromise(node)
      } else if (ts.isIdentifier(node)) {
        const type = checker.getTypeAtLocation(node)
        checkTypeIsPromise(node, type)
      } else if (ts.isBinaryExpression(node)) {
        checkExpressionReturnPromise(node.left)
        checkExpressionReturnPromise(node.right)
      } else if (ts.isPrefixUnaryExpression(node)) {
        checkExpressionReturnPromise(node.operand)
      }
    }

    function checkIFWhileStatementConditionReturnPromise(node: TSESTree.IfStatement | TSESTree.WhileStatement) {
      const originalNode: ts.IfStatement | ts.WhileStatement = parserServices.esTreeNodeToTSNodeMap.get(node)
      checkExpressionReturnPromise(originalNode.expression)
    }

    return {
      CallExpression(node) {
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node)
        if (ts.isReturnStatement(originalNode.parent) || ts.isAwaitExpression(originalNode.parent)) {
          return
        }

        const functionNode = findFunction(originalNode)
        if (!functionNode || !functionNode.body || !ts.isBlock(functionNode.body)) {
          return
        }
        if (!functionNode.modifiers || functionNode.modifiers.every((m) => m.kind !== ts.SyntaxKind.AsyncKeyword)) {
          const signature = checker.getSignatureFromDeclaration(functionNode)
          if (signature) {
            const returnType = checker.getReturnTypeOfSignature(signature)
            if (returnType.flags === ts.TypeFlags.Void) {
              return
            }
          }
        }

        checkCallExpressionReturnPromise(originalNode as ts.CallExpression)
      },
      IfStatement(node) {
        checkIFWhileStatementConditionReturnPromise(node)
      },
      WhileStatement(node) {
        checkIFWhileStatementConditionReturnPromise(node)
      }
    }
  }
})
