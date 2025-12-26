import { getPrompt } from '../../prompts/index.mjs';

export class PromptDispatcher {
  constructor() {}

  call(promptId) {
    const data = getPrompt(promptId);
    return {
      content: [
        { type: 'json', json: data },
        { type: 'text', text: JSON.stringify(data) },
      ],
    };
  }
}
