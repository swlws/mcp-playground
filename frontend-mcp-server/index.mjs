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

  const res = await dispatch(msg);
  if (res) {
    process.stdout.write(JSON.stringify(res) + '\n');
  }
});
