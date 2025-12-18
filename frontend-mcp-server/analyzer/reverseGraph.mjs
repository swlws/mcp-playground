// export function buildReverseGraph(edges) {
//   const reverse = new Map();

//   for (const { from, to } of edges) {
//     for (const dep of to) {
//       if (!reverse.has(dep)) {
//         reverse.set(dep, new Set());
//       }
//       reverse.get(dep).add(from);
//     }
//   }

//   return reverse;
// }
