/**
 * combines plugins and consumer customStyleFn into a single function
 * @param {function[]} styleFns - array of customStyleFn's [expected signature is (style: string, block: ContentBock) => object]
 * @return {(style, block) => object} function aggregate
 */
export const combineStyleFns = styleFns => {
  return (style, block) => {
    return styleFns.reduce((cssStyle, fn = () => ({})) => {
      return { ...cssStyle, ...fn(style, block) };
    }, {});
  };
};
