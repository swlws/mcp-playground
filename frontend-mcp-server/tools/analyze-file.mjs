import fs from 'node:fs';
import { parseAndAnalyze } from '../tool-set/analyze-file/index.mjs';

export async function analyzeFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const data = parseAndAnalyze(code, filePath);

  return {
    content: [
      {
        type: 'json',
        json: data,
      },
    ],
  };
}
