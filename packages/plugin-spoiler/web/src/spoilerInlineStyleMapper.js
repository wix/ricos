import React from 'react';
import SpoilerViewer from './spoiler-viewer';

export default (config, raw = { blocks: [] }) => {
  const mapper = raw.blocks.reduce((map, block) => {
    const isWithSpoiler =
      block?.inlineStyleRanges?.filter(range => range.style === 'SPOILER').length > 0;

    if (isWithSpoiler) {
      map.SPOILER = (children, { key }) => (
        <SpoilerViewer key={key} children={children} {...config} />
      );
    }

    return map;
  }, {});
  return () => mapper;
};
