import { dispatch } from './mcp/dispatcher.mjs';

const commandList = [
  `{ "jsonrpc": "2.0", "id": 0, "method": "initialize", "params": { "rootDir": "D://OpenSource/mcp-playground/frontend-mcp-server" } }`,
  `{ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }`,
  `{ "jsonrpc": "2.0", "id": 2, "method": "resources/read", "params": { "uri": "file://D://OpenSource/mcp-playground/frontend-mcp-server/resources/read-file.mjs" } }`,
  `{ "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "analyze_file", "arguments": { "filePath": "D://OpenSource/react-playground/src/components/advanced-search/index.jsx" } } }`,
  `{ "jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": { "name": "analyze_project", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx" } } }`,
  `{ "jsonrpc": "2.0", "id": 5, "method": "tools/call", "params": { "name": "impact_analysis", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx", "changedFile": "D://OpenSource/react-playground/src/components/advanced-search/constant.js"} } }`,
  `{ "jsonrpc": "2.0", "id": 6, "method": "tools/call", "params": { "name": "analyze_hubs", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx"} } }`,
  `{ "jsonrpc": "2.0", "id": 7, "method": "tools/call", "params": { "name": "impact_analysis_git", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/k-chart", "entry": "index.jsx", "gitRootDir": "D://OpenSource/react-playground"} } }`,
  // `{ "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "analyze_codebase", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx"} } }`,

  // `{ "jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": { "name": "analyze_file", "arguments": { "filePath": "D://KyeCode/kye-appcenter-sdk/src/lib/index.ts" } } }`,
];

async function runCommand(line) {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  console.log('\ncommand:', msg.method, msg.params?.name, '\n');

  const res = await dispatch(msg);
  if (res) {
    process.stdout.write(JSON.stringify(res) + '\n');
  }
}

async function main() {
  for (const line of commandList) {
    await runCommand(line);
  }
}

main();
