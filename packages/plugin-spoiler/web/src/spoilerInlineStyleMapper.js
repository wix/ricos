import React from 'react';
import SpoilerViewer from './spoiler-viewer';

export default (config, raw = { blocks: [] }) => {
  const mapper = raw.blocks.reduce((map, block) => {
    block?.inlineStyleRanges?.forEach((range, idx) => {
      if (range.style.includes('SPOILER')) {
        const stateChangeCallBacks = [];
        const callAllCallbacks = newState => stateChangeCallBacks.forEach(cb => cb(newState));
        map[range.style] = children => (
          <SpoilerViewer
            dataHook={`spoiler_${idx}`}
            stateChangeCallBacks={stateChangeCallBacks}
            callAllCallbacks={callAllCallbacks}
            children={children}
          />
        );
      }
    });

    return map;
  }, {});
  return () => mapper;
};
