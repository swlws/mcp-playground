export class AgentMemory {
  constructor() {
    this.steps = [];
  }

  addStep(step) {
    this.steps.push(step);
  }

  summary() {
    return this.steps.map((s, i) => ({
      step: i + 1,
      tool: s.tool,
      reason: s.reason,
    }));
  }

  getRaw() {
    return this.steps;
  }
}
