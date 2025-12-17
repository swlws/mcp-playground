import { analyzeProject } from '../analyzer/project.mjs';
import { detectCycles } from '../analyzer/cycle.mjs';

export async function analyzeProjectTool({ rootDir, entry }) {
  const graph = analyzeProject(rootDir, entry);
  const cycles = detectCycles(graph);

  return {
    content: [
      {
        type: 'json',
        json: {
          nodes: [...graph.nodes],
          edges: [...graph.edges.entries()].map(([from, tos]) => ({
            from,
            to: [...tos],
          })),
          cycles,
        },
      },
    ],
  };
}
