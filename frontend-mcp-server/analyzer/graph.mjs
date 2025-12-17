// analyzer/graph.mjs
export function createGraph() {
  return {
    nodes: new Set(),
    edges: new Map(), // from -> Set(to)
  };
}

export function addEdge(graph, from, to) {
  graph.nodes.add(from);
  graph.nodes.add(to);

  if (!graph.edges.has(from)) {
    graph.edges.set(from, new Set());
  }
  graph.edges.get(from).add(to);
}
