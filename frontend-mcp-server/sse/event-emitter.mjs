import { broadcast } from './client-manager.mjs';

// 也可以提供对外 API
export function emit(event, data) {
  broadcast(event, data);
}
