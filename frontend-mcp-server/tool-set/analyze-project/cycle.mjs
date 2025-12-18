export function detectCycles(graph) {
  const visited = new Set();
  const stack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (stack.has(node)) {
      const idx = path.indexOf(node);
      cycles.push(path.slice(idx));
      return;
    }

    if (visited.has(node)) return;

    visited.add(node);
    stack.add(node);

    const next = graph.edges.get(node) || [];
    for (const n of next) {
      dfs(n, [...path, n]);
    }

    stack.delete(node);
  }

  for (const node of graph.nodes) {
    dfs(node, [node]);
  }

  return cycles;
}
