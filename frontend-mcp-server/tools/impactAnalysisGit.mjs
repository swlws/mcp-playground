import { analyzeProject } from '../analyzer/project.mjs';
import { getChangedFiles } from '../analyzer/gitDiff.mjs';
import { analyzeGitImpact } from '../analyzer/impactGit.mjs';

export async function impactAnalysisGitTool({
  rootDir,
  entry,
  gitRootDir,
  base = 'HEAD~1',
  head = 'HEAD',
}) {
  const changedFiles = getChangedFiles(gitRootDir, base, head);

  const graph = analyzeProject(rootDir, entry);

  const impact = analyzeGitImpact(graph, changedFiles);

  return {
    content: [
      {
        type: 'json',
        json: {
          base,
          head,
          changedFiles,
          impactedFiles: impact.impactedFiles,
          impactLevel: classifyImpact(
            changedFiles.length,
            impact.impactedFiles.length
          ),
          details: impact.details,
        },
      },
    ],
  };
}

function classifyImpact(changedCount, impactedCount) {
  if (impactedCount === 0) return 'none';
  if (impactedCount < 5 && changedCount < 3) return 'low';
  if (impactedCount < 15) return 'medium';
  return 'high';
}
