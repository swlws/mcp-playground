import { execSync } from 'node:child_process';
import path from 'node:path';

const FRONTEND_EXT = ['.ts', '.tsx', '.js', '.jsx', '.vue'];

export function getChangedFiles(rootDir, base, head) {
  const cmd = `git diff --name-only ${base} ${head}`;
  const output = execSync(cmd, { cwd: rootDir }).toString();

  return output
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
    .filter((f) => FRONTEND_EXT.some((ext) => f.endsWith(ext)))
    .map((f) => path.resolve(rootDir, f));
}
