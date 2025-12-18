import { analyzeProject } from '../analyze-project/project.mjs';
import { getChangedFiles } from '../impact-analysis-git/git-diff.mjs';
import { analyzeGitImpact } from '../impact-analysis-git/impact-git.mjs';

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
