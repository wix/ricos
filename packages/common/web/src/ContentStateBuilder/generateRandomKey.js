const seenKeys = {};
const MULTIPLIER = Math.pow(2, 24);

const generateRandomKey = () => {
  let key;
  // eslint-disable-next-line fp/no-loops
  while (key === undefined || !isNaN(Number(key)) || seenKeys[key]) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  seenKeys[key] = true;
  return key;
};

export default generateRandomKey;
