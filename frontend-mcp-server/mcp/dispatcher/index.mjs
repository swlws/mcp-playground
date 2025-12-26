import { tools } from '../../tools/index.mjs';
import { readResource } from '../../resources/index.mjs';
import { capabilities } from '../capabilities.mjs';
import { appendErrorLogToFile, appendInfoLogToFile } from '../../utils/log.mjs';
import { ENUM_METHOD } from './enum.mjs';
import { ToolDispatcher } from './tool-dispatcher.mjs';
import { PromptDispatcher } from './prompt-dispatcher.mjs';
import { listPrompts } from '../../prompts/index.mjs';

const toolDispatcher = new ToolDispatcher();
const promptDispatcher = new PromptDispatcher();

const factory = {
  [ENUM_METHOD.INITIALIZE]: ({ id, params }) => {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: { name: 'frontend-mcp', version: '0.1.0' },
        capabilities,
      },
    };
  },
  [ENUM_METHOD.TOOLS_LIST]: ({ id, params }) => {
    return { jsonrpc: '2.0', id, result: { tools } };
  },
  [ENUM_METHOD.TOOLS_CALL]: async ({ id, params }) => {
    return {
      jsonrpc: '2.0',
      id,
      result: await toolDispatcher.handleMcpCall(params),
    };
  },
  [ENUM_METHOD.RESOURCES_READ]: async ({ id, params }) => {
    return {
      jsonrpc: '2.0',
      id,
      result: await readResource(params.uri),
    };
  },
  [ENUM_METHOD.PROMPTS_LIST]: ({ id, params }) => {
    const prompts = listPrompts();
    return { jsonrpc: '2.0', id, result: { prompts } };
  },
  [ENUM_METHOD.PROMPTS_GET]: ({ id, params }) => {
    return {
      jsonrpc: '2.0',
      id,
      result: promptDispatcher.call(params.id),
    };
  },

  // ----------------- 通知类 -------------------

  [ENUM_METHOD.NOTIFICATIONS_INITIALIZED]: ({ id, params }) => {
    return { jsonrpc: '2.0', id, result: {} };
  },
  [ENUM_METHOD.NOTIFICATIONS_TOOLS_LIST_CHANGED]: ({ id, params }) => {
    return { jsonrpc: '2.0', id, result: {} };
  },
};

export async function dispatch({ id, method, params }) {
  appendInfoLogToFile({ id, method, params });

  try {
    let result;
    if (factory[method]) {
      result = await factory[method]({ id, method, params });

      appendInfoLogToFile(result);
      return result;
    }

    return error(id, -32601, `Method ${method} not found`);
  } catch (e) {
    console.error(e);
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
