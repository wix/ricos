const kebabToCamel = s => s.replace(/-([a-z])/, (_, p1) => p1.toUpperCase());

export const kebabToCamelObjectKeys = (obj = {}) =>
  Object.keys(obj).reduce((result, key) => {
    result[kebabToCamel(key)] = obj[key];
    return result;
  }, {});

// eslint-disable-next-line no-unused-vars
export const hasText = ([_, data]) => data[0]?.trim().length > 0;
