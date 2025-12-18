import { ENUM_TOOL_NAMES } from '../tools/enum.mjs';

const reducers = {
  [ENUM_TOOL_NAMES.ANALYZE_PROJECT]: (body) => {
    return body.content[0].json;
  },
};

export async function ctxRpcCall(ctx, toolName, params) {
  const body = await ctx.rpc.call(toolName, params);
  const handler = reducers[toolName];
  return typeof handler === 'function' ? handler(body) : body;
}
