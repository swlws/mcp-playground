import path from 'node:path';

/**
 * 将 Windows / Unix 路径统一转为：
 * D://xxx/yyy/zzz.js
 */
export function toDoubleSlashPosixPath(inputPath) {
  // 先 normalize，解决 \\ / 混用问题
  const normalized = path.normalize(inputPath);

  // 统一替换为 /
  let posixPath = normalized.replace(/\\/g, '/');

  // 处理 Windows 盘符：D:/xxx → D://xxx
  posixPath = posixPath.replace(/^([a-zA-Z]):\//, (_, drive) => `${drive}://`);

  return posixPath;
}

// const set = new Set();
// const winPath = 'D:\\xxx\\yyy\\zzz.js';
// const unixPath = '/aaa/bbb/ccc.js';
// set.add(winPath);
// set.add(toDoubleSlashPosixPath(winPath));
// set.add(unixPath);
// set.add(toDoubleSlashPosixPath(unixPath));
// console.log(set);
