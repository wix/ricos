import Version from '../versioningUtils';
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

const applyStrategies = (strategies, processed, version, ...args) => {
  if (!strategies) {
    return processed;
  }

  let processedUnit = processed;
  strategies
    .filter(strategy => isVersionCompatible(strategy, version))
    .forEach(strategy => {
      strategy.processors.reduce((unit, processor) => {
        processedUnit = processor(unit, ...args);
        return processedUnit;
      }, processed);
    });
  return processedUnit;
};

export const processContentState = (contentState, config) => {
  const { VERSION: contentStateVersion = '0.0.0' } = contentState;

  //process the whole state
  const processedState = applyStrategies(
    contentStateProcessingStrategies,
    contentState,
    contentStateVersion,
    config
  );

  const { blocks, entityMap } = processedState;

  return {
    blocks: blocks.map(block => {
      let processedBlock = block;

      // process block
      processedBlock = applyStrategies(
        blockProcessingStrategies[block.type],
        block,
        contentStateVersion,
        entityMap,
        config
      );

      // process block entity ranges
      if (processedBlock.entityRanges) {
        processedBlock.entityRanges.forEach(range => {
          const entityType = entityMap[range.key + ''].type;
          processedBlock = applyStrategies(
            entityRangeProcessingStrategies[entityType],
            processedBlock,
            contentStateVersion,
            range,
            entityMap,
            config
          );
        });
      }

      return processedBlock;
    }),
    entityMap,
    VERSION: Version.lessThan(contentStateVersion, Version.currentVersion)
      ? Version.currentVersion
      : contentStateVersion,
  };
};
