import parser from '@babel/parser';
import traverse from '@babel/traverse';

export function parseAndAnalyze(code, filePath) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const result = {
    filePath,
    imports: [],
    exports: [],
    hooks: [],
    functions: [],
  };

  traverse.default(ast, {
    ImportDeclaration(p) {
      result.imports.push(p.node.source.value);
    },
    ExportNamedDeclaration(p) {
      if (p.node.declaration?.id) {
        result.exports.push(p.node.declaration.id.name);
      }
    },
    CallExpression(p) {
      const c = p.node.callee;
      if (c.type === 'Identifier' && /^use[A-Z]/.test(c.name)) {
        result.hooks.push(c.name);
      }
    },
    FunctionDeclaration(p) {
      result.functions.push(p.node.id.name);
    },
  });

  return result;
}
