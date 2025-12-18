import { BaseAgent } from './base-agent.mjs';
import { ENUM_TOOL_NAMES } from '../tools/enum.mjs';
import { ctxRpcCall } from '../utils/ctx-rpc-call.mjs';

export class CodeAnalysisAgent extends BaseAgent {
  async run(input) {
    const { rootDir, entry, gitRootDir } = input;

    const state = {};

    // Step 1: 项目依赖图
    state.graph = await ctxRpcCall(this.ctx, ENUM_TOOL_NAMES.ANALYZE_PROJECT, {
      rootDir,
      entry,
    });

    // // Step 2: Hub 分析
    state.hubs = await ctxRpcCall(this.ctx, ENUM_TOOL_NAMES.ANALYZE_HUBS, {
      rootDir,
      entry,
    });

    // Step 3: Git Impact（可选）
    if (gitRootDir) {
      state.impact = await ctxRpcCall(
        this.ctx,
        ENUM_TOOL_NAMES.IMPACT_ANALYSIS_GIT,
        { rootDir, entry, base: gitRootDir }
      );
    }

    return {
      graphSummary: {
        nodes: state.graph.nodes.length,
        edges: state.graph.edges.length,
      },
      hubs: state.hubs,
      impact: state.impact ?? null,
    };
  }
}
