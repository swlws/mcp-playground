/**
 * 👉 权重解释：
 * 被依赖（inDegree）权重大：改动影响更大
 * @param {*} nodes
 * @param {*} edges
 * @returns
 */
export function analyzeHubs(nodes, edges) {
  const inDegree = new Map();
  const outDegree = new Map();

  // 初始化
  for (const n of nodes) {
    inDegree.set(n, 0);
    outDegree.set(n, 0);
  }

  // 统计度数
  for (const { from, to } of edges) {
    outDegree.set(from, to.length);
    for (const dep of to) {
      inDegree.set(dep, (inDegree.get(dep) || 0) + 1);
    }
  }

  // 计算 Hub Score（可调权重）
  const hubs = nodes.map((n) => {
    const inD = inDegree.get(n) || 0;
    const outD = outDegree.get(n) || 0;

    return {
      file: n,
      inDegree: inD,
      outDegree: outD,
      hubScore: inD * 2 + outD,
    };
  });

  // 排序：核心模块在前
  hubs.sort((a, b) => b.hubScore - a.hubScore);

  return hubs;
}
