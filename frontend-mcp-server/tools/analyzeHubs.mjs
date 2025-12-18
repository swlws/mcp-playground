import { analyzeProject } from '../tool-set/analyze-project/project.mjs';
import { analyzeHubs } from '../analyzer/hub.mjs';

export async function analyzeHubsTool({ rootDir, entry, topN = 10 }) {
  const graph = analyzeProject(rootDir, entry);

  const nodes = [...graph.nodes];
  const edges = [...graph.edges.entries()].map(([from, tos]) => ({
    from,
    to: [...tos],
  }));

  const hubs = analyzeHubs(nodes, edges).slice(0, topN);

  return {
    content: [
      {
        type: 'json',
        json: {
          topN,
          hubs,
        },
      },
    ],
  };
}
