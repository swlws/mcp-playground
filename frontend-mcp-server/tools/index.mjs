import { analyzeFile } from '../tool-set/analyze-file/index.mjs';
import { analyzeHubsTool } from '../tool-set/analyze-hubs/index.mjs';
import { analyzeProjectTool } from '../tool-set/analyze-project/index.mjs';
import { impactAnalysisTool } from '../tool-set/impact-analysis/index.mjs';
import { impactAnalysisGitTool } from '../tool-set/impact-analysis-git/index.mjs';

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
    handler: analyzeFile,
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
    handler: analyzeProjectTool,
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
    handler: impactAnalysisTool,
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
    handler: analyzeHubsTool,
  },
  {
    name: 'impact_analysis_git',
    description: 'Impact analysis based on git diff',
    inputSchema: {
      type: 'object',
      properties: {
        rootDir: { type: 'string' },
        entry: { type: 'string' },
        gitRootDir: { type: 'string' },
        base: { type: 'string' },
        head: { type: 'string' },
      },
      required: ['rootDir', 'entry', 'gitRootDir'],
    },
    handler: impactAnalysisGitTool,
  },
];
