import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function getLogFilePath(level = 'info') {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const logDir = path.resolve(__dirname, '..', '..', 'logs');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return path.join(logDir, `${year}-${month}-${day}-${level}.log`);
}

export function appendInfoLogToFile(content) {
  const logFilePath = getLogFilePath('info');
  fs.appendFileSync(logFilePath, JSON.stringify(content) + '\n');
}

export function appendErrorLogToFile(content) {
  const logFilePath = getLogFilePath('error');
  fs.appendFileSync(logFilePath, JSON.stringify(content) + '\n');
}
