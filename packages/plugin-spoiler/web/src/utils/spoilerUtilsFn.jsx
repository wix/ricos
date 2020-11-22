import { SPOILER_TYPE } from '../types';

export const customStyleFn = styles =>
  styles.toArray().reduce(cssStyle => {
    return {
      ...cssStyle,
      filter: 'blur(0.25em)',
      display: 'inline',
    };
  }, {});

export const styleFnFilter = () => {
  return styles => {
    const _styles = styles.filter(style => style === SPOILER_TYPE);
    return customStyleFn(_styles);
  };
};

export const initSpoilersContentState = contentState => {
  let prevSpoilerStyle = '';
  const blocks = contentState.blocks.map(block => {
    let isBlockContainSpoiler;
    const inlineStyleRanges = block?.inlineStyleRanges?.map(range => {
      if (range.style === SPOILER_TYPE) {
        isBlockContainSpoiler = true;
        if (block.text.length === range.offset + range.length) {
          prevSpoilerStyle =
            range.offset !== 0 || prevSpoilerStyle === ''
              ? `SPOILER_${block.key}_${range.offset}_${range.offset + range.length}`
              : prevSpoilerStyle;
        }
        return {
          ...range,
          style:
            range.offset === 0 && prevSpoilerStyle !== ''
              ? prevSpoilerStyle
              : `SPOILER_${block.key}_${range.offset}_${range.offset + range.length}`,
        };
      }
      return { ...range };
    });

    if (!isBlockContainSpoiler) {
      prevSpoilerStyle = '';
    }

    return {
      ...block,
      inlineStyleRanges,
    };
  });

  return {
    ...contentState,
    blocks,
  };
};
