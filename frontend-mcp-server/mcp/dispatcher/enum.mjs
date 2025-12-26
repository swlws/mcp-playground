export const ENUM_METHOD = {
  INITIALIZE: 'initialize',
  TOOLS_LIST: 'tools/list',
  TOOLS_CALL: 'tools/call',
  RESOURCES_READ: 'resources/read',
  RESOURCES_LIST: 'resources/list',
  PROMPTS_LIST: 'prompts/list',
  PROMPTS_GET: 'prompts/get',

  // 通知类. 客户端通知服务端事件，客户端初始化已完成
  NOTIFICATIONS_INITIALIZED: 'notifications/initialized',
  // 通知类。服务端通知客户端，工具列表变更
  NOTIFICATIONS_TOOLS_LIST_CHANGED: 'notifications/tools/list_changed',
};
