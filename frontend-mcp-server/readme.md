# frontend-mcp-server

## initialize

> { "jsonrpc": "2.0", "id": 0, "method": "initialize", "params": { "rootDir": "D://OpenSource/mcp-playground/frontend-mcp-server" } }

## 工具列表

> { "jsonrpc": "2.0", "id": 1, "method": "tools/list" }

## 调用工具

### 读文件内容

> { "jsonrpc": "2.0", "id": 1, "method": "resources/read", "params": { "uri": "file://D://OpenSource/mcp-playground/frontend-mcp-server/resources/read-file.mjs" } }

### 分析文件

> { "jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": { "name": "analyze_file", "arguments": { "filePath": "D://OpenSource/react-playground/src/components/advanced-search/index.jsx" } } }

### 解析工程中的文件依赖图（DAG 图）

> { "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "analyze_project", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx" } } }

### 文件改动后，分析所有被影响的文件

> { "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "impact_analysis", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx", "changedFile": "D://OpenSource/react-playground/src/components/advanced-search/constant.js"} } }

### 识别核心模块

> { "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "analyze_hubs", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/advanced-search", "entry": "index.jsx"} } }

### 基于 Git 的变更影响点分析

> { "jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": { "name": "impact_analysis_git", "arguments": { "rootDir": "D://OpenSource/react-playground/src/components/k-chart", "entry": "index.jsx", "gitRootDir": "D://OpenSource/react-playground"} } }
