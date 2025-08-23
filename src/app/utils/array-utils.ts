
export function getRandomWithout<T>(arr: T[], exclude: T, count: number): T[] {
  const filtered = arr.filter(item => item !== exclude);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
