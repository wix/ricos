import { Version } from '../version';
import { removeInlineHeaderRanges } from './removeInlineHeaderRanges';
import {
  addLinkUnderlineRange,
  fixAtomicBlockText,
  addInlineStyleRanges,
} from './block-processors';
import { linkify } from './linkify';
import inlinePluginsRemover from './inlinePluginsRemover';
import errorBlocksRemover from './errorBlocksRemover';
import { NormalizeConfig, RicosContent } from '../types';

// NOTE: the processor order is important
const contentStateProcessingStrategies = (config: NormalizeConfig) => {
  const { disableInlineImages, removeInvalidInlinePlugins, removeBlocksWithErrors } = config;
  return [
    removeBlocksWithErrors && { processors: [errorBlocksRemover()] },
    { version: '<3.4.7', processors: [linkify] },
    disableInlineImages && {
      version: '<8.0.0',
      processors: [inlinePluginsRemover({ imagesOnly: true })],
    },
    removeInvalidInlinePlugins && { processors: [inlinePluginsRemover()] },
  ].filter(x => x);
};

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

const applyStrategies = (strategies, processed, version: string, ...args) => {
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

export const processContentState = (contentState: RicosContent, config: NormalizeConfig) => {
  const { VERSION: contentStateVersion = '0.0.0' } = contentState;

  //process the whole state
  const processedState = applyStrategies(
    contentStateProcessingStrategies(config),
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
          const entityType =
            entityMap && entityMap[range.key + ''] && entityMap[range.key + ''].type;
          if (entityType) {
            processedBlock = applyStrategies(
              entityRangeProcessingStrategies[entityType],
              processedBlock,
              contentStateVersion,
              range,
              entityMap,
              config
            );
          }
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
