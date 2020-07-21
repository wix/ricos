import React from 'react';
import SpoilerViewer from './spoiler-viewer';
import { SPOILER_TYPE } from './types';

export default (raw = { blocks: [] }) => {
  const mapper = raw.blocks.reduce((map, block) => {
    block?.inlineStyleRanges?.forEach((range, idx) => {
      if (range.style === SPOILER_TYPE) {
        const stateChangeCallBacks = [];
        const callAllCallbacks = newState => stateChangeCallBacks.forEach(cb => cb(newState));
        const spoilerStyle = `SPOILER_${block.key}_${range.offset}_${range.offset + range.length}`;
        map[spoilerStyle] = (children, { key }) => (
          <SpoilerViewer
            dataHook={`spoiler_${idx}`}
            stateChangeCallBacks={stateChangeCallBacks}
            callAllCallbacks={callAllCallbacks}
            children={children}
            key={key}
          />
        );
      }
    });

    return map;
  }, {});
  return () => mapper;
};
