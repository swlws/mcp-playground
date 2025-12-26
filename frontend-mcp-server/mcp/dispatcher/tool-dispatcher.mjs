import { tools } from '../tools/index.mjs';

export class ToolDispatcher {
  constructor() {
    this.pending = new Map();
    this._cachedToolMap = new Map();
  }

  /** 获取工具 */
  getTool(toolName) {
    const cache = this._cachedToolMap;
    if (cache.has(toolName)) {
      return cache.get(toolName);
    }

    for (const tool of tools) {
      if (tool.name === toolName) {
        cache.set(toolName, tool);
        return tool;
      }
    }

    return null;
  }

  /** MCP 对外入口 */
  async handleMcpCall({ name, arguments: args }) {
    return this.callTool(name, args);
  }

  /** 内部 RPC 调用 */
  async callTool(toolName, args) {
    const tool = this.getTool(toolName);
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    const ctx = { rpc: this.createRpcContext() };
    return tool.handler(args, ctx);
  }

  /** 注入给 tool 的 RPC 能力 */
  createRpcContext() {
    return {
      call: (tool, args) => this.callTool(tool, args),
    };
  }
}
