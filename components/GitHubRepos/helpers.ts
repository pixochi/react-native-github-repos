export const normalizeCount = (count: number) => {
  if (count < 1000) {
    return count;
  }

  return `${(count / 1000).toFixed(1)}K`;
};
