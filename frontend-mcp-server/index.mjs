#!/usr/bin/env node
import readline from 'node:readline';
import { dispatch } from './mcp/dispatcher.mjs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  try {
    const res = await dispatch(msg);

    // dispatcher 已经返回完整 JSON-RPC response
    if (res) {
      process.stdout.write(JSON.stringify(res) + '\n');
    }
  } catch (e) {
    // 理论上不会到这，因为 dispatcher 内部已兜底
    process.stdout.write(
      JSON.stringify({
        jsonrpc: '2.0',
        id: msg?.id ?? null,
        error: { code: -32000, message: e.message },
      }) + '\n'
    );
  }
});
