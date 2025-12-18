import { buildReverseGraph } from '../impact-analysis/reverse-graph.mjs';
import { analyzeImpact } from '../impact-analysis/impact.mjs';
import { toDoubleSlashPosixPath } from '../../utils/path.mjs';
import { ENUM_TOOL_NAMES } from '../../tools/enum.mjs';
import { ctxRpcCall } from '../../utils/ctx-rpc-call.mjs';

export async function impactAnalysisTool({ rootDir, entry, changedFile }, ctx) {
  changedFile = toDoubleSlashPosixPath(changedFile);

  const { edges } = await ctxRpcCall(ctx, ENUM_TOOL_NAMES.ANALYZE_PROJECT, {
    rootDir,
    entry,
  });

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
