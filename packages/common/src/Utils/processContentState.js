import Version from './versioningUtils';
import { removeInlineHeaderRanges } from './removeInlineHeaderRanges';
import {
  addLinkUnderlineRange,
  fixAtomicBlockText,
  addInlineStyleRanges,
} from './block-processors';
import { linkify } from './linkify';

// NOTE: the processor order is important
const contentStateProcessingStrategies = [{ version: '<3.4.7', processors: [linkify] }];

const blockProcessingStrategies = {
  atomic: [{ processors: [fixAtomicBlockText] }],
  unstyled: [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'ordered-list-item': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'unordered-list-item': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'code-block': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-one': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-two': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-three': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-four': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-five': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  'header-six': [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
  blockquote: [{ processors: [removeInlineHeaderRanges, addInlineStyleRanges] }],
};

const entityRangeProcessingStrategies = {
  LINK: [
    {
      version: '<3.4.7',
      processors: [addLinkUnderlineRange],
    },
  ],
};

const isVersionCompatible = (strategy, contentStateVersion) =>
  strategy.version ? Version.evaluate(contentStateVersion, strategy.version) : true;

export const processContentState = (contentState, config) => {
  const { VERSION: contentStateVersion = '0.0.0' } = contentState;

  //process the whole state
  let processedState = contentState;
  contentStateProcessingStrategies
    .filter(strategy => isVersionCompatible(strategy, contentStateVersion))
    .forEach(strategy => {
      strategy.processors.reduce((state, processor) => {
        processedState = processor(state, config);
        return processedState;
      }, processedState);
    });

  const { blocks, entityMap } = processedState;

  return {
    blocks: blocks.map(block => {
      let processed = block;

      // process block
      const blockStrategies = blockProcessingStrategies[block.type];
      if (blockStrategies) {
        blockStrategies
          .filter(strategy => isVersionCompatible(strategy, contentStateVersion))
          .forEach(strategy => {
            strategy.processors.reduce((processedBlock, processor) => {
              processed = processor(processedBlock, entityMap, config);
              return processed;
            }, processed);
          });
      }

      // process block entity ranges
      if (processed.entityRanges) {
        processed.entityRanges.forEach(range => {
          const entityType = entityMap[range.key + ''].type;

          const strategies = entityRangeProcessingStrategies[entityType];
          if (strategies) {
            strategies
              .filter(strategy => isVersionCompatible(strategy, contentStateVersion))
              .forEach(strategy => {
                strategy.processors.reduce((processedBlock, processor) => {
                  processed = processor(processedBlock, range, entityMap, config);
                  return processed;
                }, processed);
              });
          }
        });
      }

      return processed;
    }),
    entityMap,
    VERSION: Version.lessThan(contentStateVersion, Version.getCurrent())
      ? Version.getCurrent()
      : contentStateVersion,
  };
};
