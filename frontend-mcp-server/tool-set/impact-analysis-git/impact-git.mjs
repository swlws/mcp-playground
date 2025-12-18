import { analyzeImpact } from '../impact-analysis/impact.mjs';
import { buildReverseGraph } from '../impact-analysis/reverse-graph.mjs';

export function analyzeGitImpact(edges, changedFiles) {
  const reverseGraph = buildReverseGraph(edges);

  const impactedSet = new Set();
  const impactDetails = [];

  for (const file of changedFiles) {
    const result = analyzeImpact(reverseGraph, file);

    result.impactedFiles.forEach((f) => impactedSet.add(f));

    impactDetails.push({
      changedFile: file,
      impactedFiles: result.impactedFiles,
      paths: result.paths,
    });
  }

  return {
    changedFiles,
    impactedFiles: [...impactedSet],
    details: impactDetails,
  };
}
