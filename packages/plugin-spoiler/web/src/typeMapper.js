import React from 'react';
import SpoilerViewer from './spoiler-viewer';

export const typeMapper /*: PluginTypeMapper*/ = (config, raw = { blocks: [] }) => {
  const mapper = raw.blocks.reduce((map, block) => {
    if (block.inlineStyleRanges) {
      block.inlineStyleRanges
        .filter(range => range.style === 'SPOILER')
        .forEach(range => {
          map[range.style] = (children, { key }) => (
            <SpoilerViewer key={key} children={children} {...config} />
          );
        });
    }

    return map;
  }, {});
  return () => mapper;
};
