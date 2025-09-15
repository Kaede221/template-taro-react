/**
 * 获取路径的后部分
 * @param path 完整的页面路径
 */
export const getLastTwoSegments = (path: string) => {
  // 分割路径并过滤空字符串
  const segments = path.split("/").filter((segment) => segment !== "");

  // 如果至少有两个部分，返回最后两个部分的组合
  if (segments.length >= 2) {
    return segments.slice(-2).join("/");
  }

  // 如果不足两个部分，返回现有部分（或空字符串）
  return segments.join("/");
};

/**
 * 获取路径的最后一个完整单词
 * @param path 需要获取的路径
 * @example
 * getLastPathSegment("/a/b/c/d") // d
 */
export const getLastPathSegment = (path: string) => {
  // 处理空字符串情况
  if (!path) return "";

  let end = path.length - 1;

  // 从末尾开始跳过所有斜杠
  while (end >= 0 && path[end] === "/") {
    end--;
  }

  // 如果全是斜杠，返回空字符串
  if (end < 0) return "";

  // 从end位置向前找第一个斜杠
  let start = end;
  while (start >= 0 && path[start] !== "/") {
    start--;
  }

  // 截取从start+1到end的部分
  return path.substring(start + 1, end + 1);
};
