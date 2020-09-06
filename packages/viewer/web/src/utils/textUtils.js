const kebabToCamel = s => s.replace(/-([a-z])/, (_, p1) => p1.toUpperCase());

export const kebabToCamelObjectKeys = (obj = {}) =>
  Object.keys(obj).reduce((result, key) => {
    result[kebabToCamel(key)] = obj[key];
    return result;
  }, {});

// eslint-disable-next-line no-unused-vars
export const hasText = child => {
  if (typeof child === 'string') {
    return child.trim().length > 0;
  }
  if (Array.isArray(child)) {
    return hasText(child[0]) || hasText(child[1]);
  } else if (typeof child === 'object') {
    return hasText(child.props.children);
  } else {
    return false;
  }
};

export const safariOrFirefox = () =>
  /^((?!chrome).)*safari|firefox|fxios/i.test(global.navigator?.userAgent);
