import { EditorProps, DraftInlineStyle, ContentBlock } from 'draft-js';

/**
 * combines plugins and consumer customStyleFn into a single function
 * @param {function[]} styleFns - array of customStyleFn's [expected signature is (style: string, block: ContentBock) => object]
 * @return {(style, block) => object} function aggregate
 */
export const combineStyleFns = (
  styleFns: EditorProps['customStyleFn'][]
): EditorProps['customStyleFn'] => {
  return (style: DraftInlineStyle, block: ContentBlock) => {
    return styleFns.reduce((cssStyle, fn = () => ({})) => {
      return { ...cssStyle, ...fn(style, block) };
    }, {});
  };
};
