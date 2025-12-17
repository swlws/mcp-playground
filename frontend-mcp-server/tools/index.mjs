import { analyzeFile } from './analyzeFile.mjs';
import { analyzeProjectTool } from './analyzeProject.mjs';

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
  {
    name: 'analyze_project',
    description: 'Analyze frontend project dependency graph (DAG)',
    inputSchema: {
      type: 'object',
      properties: {
        rootDir: { type: 'string' },
        entry: { type: 'string' },
      },
      required: ['rootDir', 'entry'],
    },
  },
];

export async function callTool(name, args) {
  if (name === 'analyze_file') {
    return analyzeFile(args.filePath);
  }
  if (name === 'analyze_project') {
    return analyzeProjectTool(args);
  }
  throw new Error('Unknown tool');
}
