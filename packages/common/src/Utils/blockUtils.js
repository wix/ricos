/**
 * fixAtomicBlockText
 * @description sets whitespace as atomic block text
 */
export const fixAtomicBlockText = block =>
  block.type === 'atomic' ? { ...block, text: ' ' } : block;

/**
 * fixLinkUnderlineRange
 * @description adds underline inline style ranges to links
 */
export const fixLinkUnderlineRanges = (block, entityMap) => {
  if (!block.entityRanges) {
    return block;
  }

  const inlineStyleRanges = block.entityRanges
    .filter(
      range => entityMap[range.key].type === 'LINK' && entityMap[range.key].underline !== false
    )
    .map(range => ({ offset: range.offset, length: range.length, style: 'UNDERLINE' }));

  block.inlineStyleRanges = [...(block.inlineStyleRanges || []), ...inlineStyleRanges];

  return block;
};
