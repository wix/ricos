export const generateKey = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);
