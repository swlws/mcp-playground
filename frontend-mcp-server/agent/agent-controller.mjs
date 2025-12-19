import { AgentMemory } from './memory.mjs';
import { Planner } from './planner.mjs';

export class AgentController {
  constructor({ llm, mcp, tools }) {
    this.llm = llm;
    this.mcp = mcp;
    this.tools = tools;
    this.memory = new AgentMemory();
  }

  async run(goal) {
    const planner = new Planner({
      llm: this.llm,
      tools: this.tools,
    });

    let loopCountLimit = 20;

    while (true) {
      if (loopCountLimit-- < 0) {
        throw new Error(`Agent loop exceeded ${loopCountLimit} iterations`);
      }

      const plan = await planner.plan({
        goal,
        memory: this.memory,
      });

      if (plan.type === 'tool') {
        const result = await this.mcp.call(plan.tool, plan.input);

        this.memory.addStep({
          tool: plan.tool,
          input: plan.input,
          output: result,
          reason: plan.reason,
        });

        continue;
      }

      if (plan.type === 'final') {
        return {
          answer: plan.answer,
          trace: this.memory.getRaw(),
        };
      }

      throw new Error('Unknown plan type');
    }
  }
}
