import { analyzeHubs } from './hub.mjs';
import { ENUM_TOOL_NAMES } from '../../tools/enum.mjs';
import { ctxRpcCall } from '../../utils/ctx-rpc-call.mjs';

export async function analyzeHubsTool({ rootDir, entry, topN = 10 }, ctx) {
  const { nodes, edges } = await ctxRpcCall(
    ctx,
    ENUM_TOOL_NAMES.ANALYZE_PROJECT,
    {
      rootDir,
      entry,
    }
  );

  const hubs = analyzeHubs(nodes, edges).slice(0, topN);

  const data = { topN, hubs };

  return {
    content: [
      { type: 'json', json: data },
      { type: 'text', text: JSON.stringify(data) },
    ],
  };
}
