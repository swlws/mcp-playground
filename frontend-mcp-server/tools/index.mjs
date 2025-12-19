import { analyzeFile } from '../tool-set/analyze-file/index.mjs';
import { analyzeHubsTool } from '../tool-set/analyze-hubs/index.mjs';
import { analyzeProjectTool } from '../tool-set/analyze-project/index.mjs';
import { impactAnalysisTool } from '../tool-set/impact-analysis/index.mjs';
import { impactAnalysisGitTool } from '../tool-set/impact-analysis-git/index.mjs';

import { ENUM_TOOL_NAMES } from './enum.mjs';

export const tools = [
  {
    name: ENUM_TOOL_NAMES.ANALYZE_FILE,
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
    name: ENUM_TOOL_NAMES.ANALYZE_PROJECT,
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
    name: ENUM_TOOL_NAMES.IMPACT_ANALYSIS,
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
    name: ENUM_TOOL_NAMES.ANALYZE_HUBS,
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
    name: ENUM_TOOL_NAMES.IMPACT_ANALYSIS_GIT,
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

export function registerTool(toolConfig = {}) {
  const { name } = toolConfig;

  const tool = tools.find((tool) => tool.name === name);
  if (tool) return;

  tools.push(toolConfig);
  const key = name.toUpperCase();
  ENUM_TOOL_NAMES[key] = name;
}
