import { tools, callTool } from '../tools/index.mjs';
import { readResource } from '../resources/index.mjs';
import { capabilities } from './capabilities.mjs';

export async function dispatch({ id, method, params }) {
  try {
    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'frontend-mcp', version: '0.1.0' },
          capabilities,
        },
      };
    }

    if (method === 'tools/list') {
      return { jsonrpc: '2.0', id, result: { tools } };
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      return {
        jsonrpc: '2.0',
        id,
        result: await callTool(name, args),
      };
    }

    if (method === 'resources/read') {
      return {
        jsonrpc: '2.0',
        id,
        result: await readResource(params.uri),
      };
    }

    return error(id, -32601, 'Method not found');
  } catch (e) {
    console.error(e);
    return error(id, -32000, e.message);
  }
}

function error(id, code, message) {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message },
  };
}
