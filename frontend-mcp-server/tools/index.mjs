import { analyzeFile } from './analyzeFile.mjs';
import { analyzeHubsTool } from './analyzeHubs.mjs';
import { analyzeProjectTool } from './analyzeProject.mjs';
import { impactAnalysisTool } from './impactAnalysis.mjs';

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
  {
    name: 'impact_analysis',
    description: 'Analyze impact of a file change',
    inputSchema: {
      type: 'object',
      properties: {
        rootDir: { type: 'string' },
        entry: { type: 'string' },
        changedFile: { type: 'string' },
      },
      required: ['rootDir', 'entry', 'changedFile'],
    },
  },
  {
    name: 'analyze_hubs',
    description: 'Identify core modules (hub analysis)',
    inputSchema: {
      type: 'object',
      properties: {
        rootDir: { type: 'string' },
        entry: { type: 'string' },
        topN: { type: 'number' },
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
  if (name === 'impact_analysis') {
    return impactAnalysisTool(args);
  }
  if (name === 'analyze_hubs') {
    return analyzeHubsTool(args);
  }
  throw new Error('Unknown tool');
}
