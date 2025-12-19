import { AgentController } from './agent-controller.mjs';
import { ENUM_TOOL_NAMES } from '../tools/enum.mjs';

export function registerAgent(server, { llm, mcp }) {
  server.registerTool({
    name: 'agent.run',
    description: 'Run autonomous frontend code analysis agent',
    inputSchema: {
      type: 'object',
      properties: {
        goal: { type: 'string' },
      },
      required: ['goal'],
    },
    handler: async ({ goal }) => {
      const agent = new AgentController({
        llm,
        mcp,
        tools: Object.values(ENUM_TOOL_NAMES),
      });

      return await agent.run(goal);
    },
  });
}
