export class BaseAgent {
  constructor({ ctx }) {
    this.ctx = ctx;
  }

  async run(_input) {
    throw new Error('Agent.run() must be implemented');
  }
}
