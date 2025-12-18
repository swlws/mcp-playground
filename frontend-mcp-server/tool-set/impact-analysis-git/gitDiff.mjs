import { execSync } from 'node:child_process';
import path from 'node:path';
import { toDoubleSlashPosixPath } from '../../utils/path.mjs';

const FRONTEND_EXT = ['.ts', '.tsx', '.js', '.jsx', '.vue'];

export function getChangedFiles(gitRootDir, base, head) {
  const cmd = `git diff --name-only ${base} ${head}`;
  const output = execSync(cmd, { cwd: gitRootDir }).toString();

  return output
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
    .filter((f) => FRONTEND_EXT.some((ext) => f.endsWith(ext)))
    .map((f) => toDoubleSlashPosixPath(path.resolve(gitRootDir, f)));
}
