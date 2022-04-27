export const isInRange = (number: number, range: [number, number]): boolean => number > range[0] && number < range[1]

export const isInRanges = (ranges: [[number, number], [number, number]], cx: number, cy: number): boolean => {
  const [x0, x1, y0, y1] = [ranges[0][0], ranges[1][0], ranges[0][1], ranges[1][1]]
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
}