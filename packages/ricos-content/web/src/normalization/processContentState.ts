import { Version } from '../version';
import { removeInlineHeaderRanges } from './removeInlineHeaderRanges';
import {
  addLinkUnderlineRange,
  fixAtomicBlockText,
  addInlineStyleRanges,
} from './block-processors';
import { linkify } from './linkify';
import inlinePluginsRemover from './inlinePluginsRemover';
import {
  NormalizeConfig,
  RicosContent,
  RicosContentBlock,
  RicosInlineStyleRange,
  NormalizationProcessor,
} from '../types';
// NOTE: the processor order is important
const contentStateProcessingStrategies: (
  config: NormalizeConfig
) => { version?: string; processors: NormalizationProcessor<RicosContent>[] }[] = config => {
  const { disableInlineImages, removeInvalidInlinePlugins } = config;

  const strategies = [{ version: '<3.4.7', processors: [linkify] }];
  if (disableInlineImages) {
    strategies.push({
      version: '<8.0.0',
      processors: [inlinePluginsRemover({ imagesOnly: true })],
    });
  }
  if (removeInvalidInlinePlugins) {
    strategies.push({ version: '<8.0.0', processors: [inlinePluginsRemover()] });
  }
  return strategies;
};

const blockProcessingStrategies: {
  [key: string]: { processors: NormalizationProcessor<RicosContentBlock>[] }[];
} = {
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

const entityRangeProcessingStrategies: {
  [key: string]: {
    version: string;
    processors: ((block: RicosContentBlock, range: RicosInlineStyleRange) => RicosContentBlock)[];
  }[];
} = {
  LINK: [
    {
      version: '<3.4.7',
      processors: [addLinkUnderlineRange],
    },
  ],
};

const isVersionCompatible = (strategy: { version?: string }, contentStateVersion: string) =>
  strategy.version ? Version.evaluate(contentStateVersion, strategy.version) : true;

const applyStrategies: (
  strategies: {
    version?: string;
    processors: NormalizationProcessor<RicosContent | RicosContentBlock>[];
  }[],
  processed: RicosContentBlock | RicosContent,
  version: string,
  ...args: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => ReturnType<NormalizationProcessor<RicosContent | RicosContentBlock>> = (
  strategies,
  processed,
  version,
  ...args
) => {
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

  const { blocks, entityMap } = processedState as RicosContent;

  return {
    blocks: blocks.map((block: RicosContentBlock) => {
      let processedBlock = block;

      // process block
      processedBlock = applyStrategies(
        blockProcessingStrategies[block.type],
        block,
        contentStateVersion,
        entityMap,
        config
      ) as RicosContentBlock;

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
            ) as RicosContentBlock;
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
