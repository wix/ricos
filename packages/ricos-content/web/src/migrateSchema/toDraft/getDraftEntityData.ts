/* eslint-disable fp/no-delete */
import { rich_content } from 'ricos-schema';
import {
  DRAFT_BLOCK_TYPE_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_DATA_FIELD,
  ENTITY_DECORATION_TO_MUTABILITY,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DATA_FIELD,
} from '../consts';
import toCamelCase from 'to-camel-case';
import toSlugCase from 'to-slug-case';
import toSnakeCase from 'to-snake-case';
import { has } from 'lodash';
import { MENTION_TYPE, RicosEntity, RicosEntityMap } from '../..';
import { DraftBlockType } from 'draft-js';
import { DraftTypedDecoration } from './decorationParsers';

const migrateVideoData = data => {
  if (data.url) {
    data.src = data.url;
    delete data.url;
  }
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.VideoConfig.Size[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.VideoConfig.Alignment[data.config.alignment]
    ));
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const migrateDividerData = data => {
  has(data, 'type') && (data.type = toCamelCase(rich_content.DividerData.DividerType[data.type]));
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.DividerConfig.DividerSize[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.DividerConfig.DividerAlignment[data.config.alignment]
    ));
};

const migrateImageData = data => {
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.ImageConfig.ImageSize[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.ImageConfig.ImageAlignment[data.config.alignment]
    ));
  if (has(data, 'src.originalFileName')) {
    data.src.original_file_name = data.src.originalFileName;
    delete data.src.originalFileName;
  }
  if (has(data, 'src.fileName')) {
    data.src.file_name = data.src.fileName;
    delete data.src.fileName;
  }
};

const migrateGalleryData = data => {
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.GalleryConfig.GallerySize[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.GalleryConfig.GalleryAlignment[data.config.alignment]
    ));
};

const migratePollData = data => {
  has(data, 'layout.poll.type') &&
    (data.layout.poll.type = toCamelCase(
      rich_content.PollWidgetLayout.PollLayout.LayoutType[data.layout.poll.type]
    ));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toCamelCase(
      rich_content.PollWidgetLayout.PollLayout.Direction[data.layout.poll.direction]
    ));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toCamelCase(
      rich_content.PollWidgetDesign.PollDesign.BackgroundType[data.design.poll.backgroundType]
    ));
  has(data, 'poll.settings.resultsVisibility') &&
    (data.poll.settings.resultsVisibility =
      rich_content.PollSettings.ResultsVisibility[data.poll.settings.resultsVisibility]);
  has(data, 'poll.settings.voteRole') &&
    (data.poll.settings.voteRole = rich_content.PollSettings.VoteRole[data.poll.settings.voteRole]);
};

const migrateVerticalEmbedData = data => {
  has(data, 'type') &&
    (data.type = toCamelCase(rich_content.VerticalEmbedData.VerticalType[data.type]));
};

const migrateHtmlData = data => {
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.HTMLConfig.HTMLAlignment[data.config.alignment]
    ));
};

const migrateGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toCamelCase(
      rich_content.GIphyConfigViewer.GiphyViewerSize[data.configViewer.sizes.desktop]
    ));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toCamelCase(
      rich_content.GIphyConfigViewer.GiphyViewerSize[data.configViewer.sizes.mobile]
    ));
};

const migrateLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

const migrateSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const getNodeEntityData = (node: rich_content.Node) => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE[type];
  const dataFieldName = TO_RICOS_DATA_FIELD[draftPluginType];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }
  const data = node[dataFieldName];

  switch (type) {
    case rich_content.Node.Type.VIDEO:
      migrateVideoData(data);
      break;
    case rich_content.Node.Type.DIVIDER:
      migrateDividerData(data);
      break;
    case rich_content.Node.Type.IMAGE:
      migrateImageData(data);
      break;
    case rich_content.Node.Type.GALLERY:
      migrateGalleryData(data);
      break;
    case rich_content.Node.Type.POLL:
      migratePollData(data);
      break;
    case rich_content.Node.Type.VERTICAL_EMBED:
      migrateVerticalEmbedData(data);
      break;
    case rich_content.Node.Type.HTML:
      migrateHtmlData(data);
      break;
    case rich_content.Node.Type.GIPHY:
      migrateGiphyData(data);
      break;
    case rich_content.Node.Type.LINK_PREVIEW:
      migrateLinkPreviewData(data);
      break;
    case rich_content.Node.Type.SOUND_CLOUD:
      migrateSoundCloudData(data);
      break;
    default:
  }

  return { type: draftPluginType, data };
};

export const createDecorationEntityData = (
  decoration: DraftTypedDecoration,
  entityKey: number
): RicosEntityMap => {
  const { type } = decoration;
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[type];
  if (!dataFieldName) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }

  const data = decoration[dataFieldName];
  const mutability = ENTITY_DECORATION_TO_MUTABILITY[decoration.type];

  switch (type) {
    case MENTION_TYPE:
      data.mention = { slug: data.slug, name: data.name };
      delete data.name;
      delete data.slug;
      break;
    default:
  }

  return createEntity(entityKey, { type, mutability, data });
};

export const createAtomicEntityData = (
  node: rich_content.Node,
  entityKey: number
): RicosEntityMap => {
  const { type, data } = getNodeEntityData(node);
  return createEntity(entityKey, { type, mutability: 'IMMUTABLE', data });
};

export const createTextBlockData = (node: rich_content.Node, blockType: DraftBlockType) => {
  const { textAlignment, dynamicStyles, depth } =
    node[DRAFT_BLOCK_TYPE_TO_DATA_FIELD[blockType]] || {};
  return Object.assign(
    {},
    textAlignment !== undefined
      ? { textAlignment: rich_content.Common.TextAlignment[textAlignment].toLowerCase() }
      : undefined,
    dynamicStyles !== undefined
      ? {
          dynamicStyles: Object.fromEntries(
            Object.entries(dynamicStyles).map(([key, value]) => [toSlugCase(key), value])
          ),
        }
      : undefined,
    depth ? { depth } : undefined
  );
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));

const createEntity = (key: number, { type, mutability, data }: RicosEntity): RicosEntityMap => {
  return { [key.toString()]: { type, mutability, data } };
};
