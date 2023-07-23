export function format(n: number, precise: number = 2) {
  return Math.floor(n * 10 ** precise) / 10 ** precise;
}
