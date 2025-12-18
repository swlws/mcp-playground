import { analyzeHubs } from '../analyze-hubs/hub.mjs';
import { ENUM_TOOL_NAMES } from '../../tools/index.mjs';

export async function analyzeHubsTool({ rootDir, entry, topN = 10 }, ctx) {
  const projectInfo = await ctx.rpc.call(ENUM_TOOL_NAMES.ANALYZE_PROJECT, {
    rootDir,
    entry,
  });
  const {
    json: { nodes, edges },
  } = projectInfo.content[0];

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
