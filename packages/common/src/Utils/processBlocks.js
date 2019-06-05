import get from 'lodash/get';
import Version from './versioningUtils';
import { removeInlineHeaderRanges } from './removeInlineHeaderRanges';
import { addLinkUnderlineRange, fixAtomicBlockText, addInlineStyleRanges } from './blockUtils';

// NOTE: the processor order is important
const entityProcessingStrategies = {
  LINK: [
    {
      version: '<3.4.7',
      processors: [addLinkUnderlineRange],
    },
  ],
};

const blockProcessingStrategies = {
  atomic: [fixAtomicBlockText],
  unstyled: [removeInlineHeaderRanges, addInlineStyleRanges],
  'ordered-list-item': [removeInlineHeaderRanges, addInlineStyleRanges],
  'unordered-list-item': [removeInlineHeaderRanges, addInlineStyleRanges],
  'code-block': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-one': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-two': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-three': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-four': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-five': [removeInlineHeaderRanges, addInlineStyleRanges],
  'header-six': [removeInlineHeaderRanges, addInlineStyleRanges],
  blockquote: [removeInlineHeaderRanges, addInlineStyleRanges],
};

export const processBlocks = ({ blocks, entityMap, config }) =>
  blocks.map(block => {
    let processed = block;

    // process block itself
    const blockStrategies = blockProcessingStrategies[block.type];
    if (blockStrategies) {
      processed = blockStrategies.reduce(
        (processedBlock, processor) => processor(processedBlock, entityMap, config),
        { ...block }
      );
    }

    if (!processed.entityRanges) {
      return processed;
    }

    // process block entities
    processed.entityRanges.forEach(range => {
      const entityType = entityMap[range.key].type;
      const entityVersion = get(entityMap[range.key], 'data.version', '0.0.0');

      const strategies = entityProcessingStrategies[entityType];
      if (strategies) {
        strategies
          .filter(strategy =>
            strategy.version ? Version.evaluate(entityVersion, strategy.version) : true
          )
          .forEach(strategy => {
            strategy.processors.reduce((processedBlock, processor) => {
              processed = processor(processedBlock, range, entityMap, config);
              return processed;
            }, processed);
          });
      }
    });

    return processed;
  });
