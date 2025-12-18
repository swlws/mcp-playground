import { ENUM_TOOL_NAMES } from '../../tools/enum.mjs';
import { ctxRpcCall } from '../../utils/ctx-rpc-call.mjs';
import { getChangedFiles } from './git-diff.mjs';
import { analyzeGitImpact } from './impact-git.mjs';

export async function impactAnalysisGitTool(
  { rootDir, entry, gitRootDir, base = 'HEAD~1', head = 'HEAD' },
  ctx
) {
  const changedFiles = getChangedFiles(gitRootDir, base, head);

  const { edges } = await ctxRpcCall(ctx, ENUM_TOOL_NAMES.ANALYZE_PROJECT, {
    rootDir,
    entry,
  });

  const impact = analyzeGitImpact(edges, changedFiles);

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
