export function getRandom(len) {
  return Math.floor(Math.random() * len);
}
// ABC->123
export function decoABC(abc) {
  return abc.charCodeAt(0) - 64
}
// 123->ABC
export function encoABC(num) {
  return String.fromCharCode(num + 64)
}

