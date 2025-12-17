export function analyzeImpact(reverseGraph, changedFile) {
  const impacted = new Set();
  const paths = [];
  const queue = [[changedFile, [changedFile]]];

  while (queue.length) {
    const [current, path] = queue.shift();

    const parents = reverseGraph.get(current);
    console.log('parents', parents);
    if (!parents) continue;

    for (const parent of parents) {
      if (!impacted.has(parent)) {
        impacted.add(parent);
        queue.push([parent, [...path, parent]]);
        paths.push([...path, parent]);
      }
    }
  }

  return {
    impactedFiles: [...impacted],
    paths,
  };
}
