import http from 'http';
import { addClient, startHeartbeat } from './client-manager.mjs';
import { randomUUID } from 'node:crypto';

export function startSseServer(port = 3001) {
  const server = http.createServer((req, res) => {
    if (req.url === '/sse') {
      const clientId = randomUUID();
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      addClient(clientId, res);
      res.write(': connected\n\n'); // 初始心跳

      console.log(`SSE client connected: ${clientId}`);
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  startHeartbeat();
  server.listen(port, () => console.log(`SSE server running on port ${port}`));
  return server;
}
