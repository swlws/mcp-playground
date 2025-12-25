import { analyzeProject } from './project.mjs';
import { detectCycles } from './cycle.mjs';

export async function analyzeProjectTool({ rootDir, entry }) {
  const graph = analyzeProject(rootDir, entry);
  const cycles = detectCycles(graph);

  const data = {
    nodes: [...graph.nodes],
    edges: [...graph.edges.entries()].map(([from, tos]) => ({
      from,
      to: [...tos],
    })),
    cycles,
  };

  return {
    content: [
      { type: 'json', json: data },
      { type: 'text', text: JSON.stringify(data) },
    ],
  };
}
