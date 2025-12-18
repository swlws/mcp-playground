import { readFileResource } from './read-file.mjs';

export async function readResource(uri) {
  if (uri.startsWith('file://')) {
    return readFileResource(uri);
  }
  throw new Error('Unsupported resource uri');
}
