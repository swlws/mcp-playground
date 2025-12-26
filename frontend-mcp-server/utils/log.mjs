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

function getTime() {
  const date = new Date();
  const dateString = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${dateString} ${hour}:${minute}:${second}`;
}

export function appendInfoLogToFile(content) {
  const logFilePath = getLogFilePath('info');
  fs.appendFileSync(
    logFilePath,
    `${getTime()} ${JSON.stringify(content)}` + '\n'
  );
}

export function appendErrorLogToFile(content) {
  const logFilePath = getLogFilePath('error');
  fs.appendFileSync(
    logFilePath,
    `${getTime()} ${JSON.stringify(content)}` + '\n' ||
      JSON.stringify(content) + '\n'
  );
}
