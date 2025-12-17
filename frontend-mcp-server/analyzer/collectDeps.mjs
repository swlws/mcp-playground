import parser from '@babel/parser';
import traverse from '@babel/traverse';

export function collectDeps(code) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const deps = [];

  traverse.default(ast, {
    ImportDeclaration(p) {
      deps.push(p.node.source.value);
    },
    CallExpression(p) {
      // 支持 import('xxx')
      if (p.node.callee.type === 'Import') {
        const arg = p.node.arguments[0];
        if (arg?.type === 'StringLiteral') {
          deps.push(arg.value);
        }
      }
    },
  });

  return deps;
}
