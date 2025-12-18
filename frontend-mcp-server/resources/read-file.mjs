import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function readFileResource(uri) {
  const filePath = fileURLToPath(uri);

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  const text = fs.readFileSync(filePath, 'utf-8');

  return {
    contents: [
      {
        uri,
        mimeType: guessMime(filePath),
        text,
      },
    ],
  };
}

function guessMime(filePath) {
  if (filePath.endsWith('.ts')) return 'text/typescript';
  if (filePath.endsWith('.tsx')) return 'text/tsx';
  if (filePath.endsWith('.mjs')) return 'text/javascript';
  if (filePath.endsWith('.vue')) return 'text/vue';
  return 'text/plain';
}
