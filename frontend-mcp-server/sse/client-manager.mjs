export const clients = new Map(); // clientId => { res, lastEventId }

// 添加客户端
export function addClient(clientId, res) {
  clients.set(clientId, { res, lastEventId: null });
  // 移除关闭连接
  res.on('close', () => {
    clients.delete(clientId);
  });
}

// 发送消息
function sendMessage(res, event, data, id) {
  let msg = '';
  if (id) msg += `id: ${id}\n`;
  msg += `event: ${event}\n`;
  msg += `data: ${JSON.stringify(data)}\n\n`;
  res.write(msg);
}

// 广播给所有客户端
export function broadcast(event, data, id) {
  for (const { res } of clients.values()) {
    sendMessage(res, event, data, id);
  }
}

// 单播
export function sendTo(clientId, event, data, id) {
  const client = clients.get(clientId);
  if (client) sendMessage(client.res, event, data, id);
}

// 心跳
export function startHeartbeat(interval = 15000) {
  setInterval(() => {
    for (const { res } of clients.values()) {
      res.write(':\n\n'); // SSE 注释行防止断线
    }
  }, interval);
}
