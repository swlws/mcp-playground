import path from 'node:path';
import fs from 'node:fs';

const EXTENSIONS = ['.js', '.ts', '.tsx', '.mjs', '.mjsx'];

export function resolveImport(fromFile, source, rootDir) {
  // 忽略 node_modules
  if (!source.startsWith('.')) return null;

  if (source.startsWith('@')) return null;

  const base = path.resolve(path.dirname(fromFile), source);

  // file
  const ext = path.extname(base);
  if (ext) {
    if (EXTENSIONS.includes(ext)) return base;
  } else {
    for (const ext of EXTENSIONS) {
      if (fs.existsSync(base + ext)) {
        return base + ext;
      }
    }
  }

  // index file
  for (const ext of EXTENSIONS) {
    const idx = path.join(base, 'index' + ext);
    if (fs.existsSync(idx)) {
      return idx;
    }
  }

  return null;
}
