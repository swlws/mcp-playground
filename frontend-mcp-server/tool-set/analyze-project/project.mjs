import fs from 'node:fs';
import path from 'node:path';
import { collectDeps } from './collect-deps.mjs';
import { resolveImport } from './resolve-path.mjs';
import { createGraph, addEdge } from './graph.mjs';

export function analyzeProject(rootDir, entry) {
  const graph = createGraph();
  const visited = new Set();

  function walk(filePath) {
    if (visited.has(filePath)) return;
    visited.add(filePath);

    const code = fs.readFileSync(filePath, 'utf-8');
    const deps = collectDeps(code);

    for (const dep of deps) {
      const resolved = resolveImport(filePath, dep, rootDir);
      if (!resolved) continue;

      addEdge(graph, filePath, resolved);
      walk(resolved);
    }
  }

  walk(path.resolve(rootDir, entry));

  return graph;
}
