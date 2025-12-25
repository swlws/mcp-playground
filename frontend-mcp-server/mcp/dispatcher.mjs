import { tools } from '../tools/index.mjs';
import { readResource } from '../resources/index.mjs';
import { capabilities } from './capabilities.mjs';
import { appendErrorLogToFile, appendInfoLogToFile } from '../utils/log.mjs';

class ToolDispatcher {
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

    return tool.handler(args, {
      rpc: this.createRpcContext(),
    });
  }

  /** 注入给 tool 的 RPC 能力 */
  createRpcContext() {
    return {
      call: (tool, args) => this.callTool(tool, args),
    };
  }
}

const toolDispatcher = new ToolDispatcher();

export async function dispatch({ id, method, params }) {
  appendInfoLogToFile({ id, method, params });

  try {
    if (method === 'initialize') {
      const result = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'frontend-mcp', version: '0.1.0' },
          capabilities,
        },
      };

      appendInfoLogToFile(result);

      return result;
    }

    if (method === 'tools/list') {
      return { jsonrpc: '2.0', id, result: { tools } };
    }

    if (method === 'tools/call') {
      const result = {
        jsonrpc: '2.0',
        id,
        result: await toolDispatcher.handleMcpCall(params),
      };

      appendInfoLogToFile(result);

      return result;
    }

    if (method === 'resources/read') {
      const result = {
        jsonrpc: '2.0',
        id,
        result: await readResource(params.uri),
      };

      appendInfoLogToFile(result);

      return result;
    }

    return error(id, -32601, 'Method not found');
  } catch (e) {
    return error(id, -32000, e.message);
  }
}

function error(id, code, message) {
  const info = {
    jsonrpc: '2.0',
    id,
    error: { code, message },
  };

  appendErrorLogToFile(info);

  return info;
}
