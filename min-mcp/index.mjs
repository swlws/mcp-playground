#!/usr/bin/env node

import readline from 'node:readline';

/**
 * ===== MCP Server 最小实现 =====
 * - 传输：stdio
 * - 协议：JSON-RPC 2.0
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

/** -----------------------------
 * 工具定义
 * ----------------------------- */
const tools = [
  {
    name: 'echo',
    description: 'Echo back the input text',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
      },
      required: ['text'],
    },
  },
];

/** -----------------------------
 * 工具实现
 * ----------------------------- */
async function callTool(name, args) {
  switch (name) {
    case 'echo':
      return {
        content: [
          {
            type: 'text',
            text: `Echo: ${args.text}`,
          },
        ],
      };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

/** -----------------------------
 * JSON-RPC 处理
 * ----------------------------- */
async function handleMessage(message) {
  const { id, method, params } = message;

  try {
    // initialize
    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: 'minimal-mcp-server',
            version: '0.1.0',
          },
          capabilities: {
            tools: tools,
            resources: {},
            prompts: {},
          },
        },
      };
    }

    // tools/list
    if (method === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools,
        },
      };
    }

    // tools/call
    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      const result = await callTool(name, args);

      return {
        jsonrpc: '2.0',
        id,
        result,
      };
    }

    // unknown method
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Method not found: ${method}`,
      },
    };
  } catch (err) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32000,
        message: err.message,
      },
    };
  }
}

/** -----------------------------
 * stdin 监听
 * ----------------------------- */
rl.on('line', async (line) => {
  if (!line.trim()) return;

  let message;
  try {
    message = JSON.parse(line);
  } catch {
    return;
  }

  const response = await handleMessage(message);

  if (response) {
    process.stdout.write(JSON.stringify(response) + '\n');
  }
});
