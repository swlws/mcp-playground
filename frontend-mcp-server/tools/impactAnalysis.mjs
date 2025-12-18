import path from 'path';
import { analyzeProject } from '../analyzer/project.mjs';
import { buildReverseGraph } from '../analyzer/reverseGraph.mjs';
import { analyzeImpact } from '../analyzer/impact.mjs';
import { toDoubleSlashPosixPath } from '../utils/path.mjs';

export async function impactAnalysisTool({ rootDir, entry, changedFile }) {
  changedFile = toDoubleSlashPosixPath(changedFile);

  const graph = analyzeProject(rootDir, entry);

  const edges = [...graph.edges.entries()].map(([from, tos]) => ({
    from,
    to: [...tos],
  }));

  const reverseGraph = buildReverseGraph(edges);

  const result = analyzeImpact(reverseGraph, changedFile);

  return {
    content: [
      {
        type: 'json',
        json: {
          changedFile,
          impactedFiles: result.impactedFiles,
          impactPaths: result.paths,
          impactLevel: classifyImpact(result.impactedFiles.length),
        },
      },
    ],
  };
}

function classifyImpact(count) {
  if (count === 0) return 'none';
  if (count < 3) return 'low';
  if (count < 10) return 'medium';
  return 'high';
}
