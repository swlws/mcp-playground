// prompts/summarize_project.mjs
export default {
  id: 'summarize_project',
  name: 'Summarize Project',
  description: 'Generate a high-level summary of the current project',
  arguments: [
    {
      name: 'audience',
      description: 'Target audience',
      required: false,
    },
  ],
  messages: [
    {
      role: 'system',
      content: 'You are an expert frontend architect.',
    },
    {
      role: 'user',
      content: 'Summarize the project for {{audience}}.',
    },
  ],
};
