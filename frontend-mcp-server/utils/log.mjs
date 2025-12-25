import fs from 'fs';
import path from 'path';

export function logToFile(content) {
  // const logFilePath = path.join(process.cwd(), 'log.txt');
  const logFilePath = `D:/OpenSource/mcp-playground/log.txt`;
  fs.writeFileSync(logFilePath, JSON.stringify(content) + '\n');
}
