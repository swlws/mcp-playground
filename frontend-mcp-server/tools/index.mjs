import { analyzeFile } from './analyzeFile.mjs';

export const tools = [
  {
    name: 'analyze_file',
    description: 'Analyze frontend source file',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string' },
      },
      required: ['filePath'],
    },
  },
];

export async function callTool(name, args) {
  if (name === 'analyze_file') {
    return analyzeFile(args.filePath);
  }
  throw new Error('Unknown tool');
}
