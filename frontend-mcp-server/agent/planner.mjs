import { PLANNER_PROMPT } from './prompts.mjs';

export class Planner {
  constructor({ llm, tools }) {
    this.llm = llm;
    this.tools = tools;
  }

  async plan({ goal, memory }) {
    const prompt = PLANNER_PROMPT.replace('{{goal}}', goal)
      .replace('{{tools}}', JSON.stringify(this.tools, null, 2))
      .replace('{{history}}', JSON.stringify(memory.summary(), null, 2));

    const res = await this.llm.complete(prompt);

    try {
      return JSON.parse(res);
    } catch {
      throw new Error('Planner output is not valid JSON');
    }
  }
}
