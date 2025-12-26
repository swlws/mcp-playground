const prompts = new Map();

export function registerPrompt(prompt) {
  prompts.set(prompt.id, prompt);
}

export function listPrompts() {
  return [...prompts.values()].map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
  }));
}

export function getPrompt(id) {
  return prompts.get(id);
}
