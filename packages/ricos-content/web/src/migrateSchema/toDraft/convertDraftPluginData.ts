/* eslint-disable fp/no-delete */
import { rich_content } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import toSnakeCase from 'to-snake-case';
import { has, cloneDeep } from 'lodash';

export const convertNodeDataToDraft = (nodeType: rich_content.Node.Type, data) => {
  const newData = cloneDeep(data);
  const conversionFunctions = {
    [rich_content.Node.Type.VIDEO]: convertVideoData,
    [rich_content.Node.Type.DIVIDER]: convertDividerData,
    [rich_content.Node.Type.IMAGE]: convertImageData,
    [rich_content.Node.Type.GALLERY]: convertGalleryData,
    [rich_content.Node.Type.POLL]: convertPollData,
    [rich_content.Node.Type.VERTICAL_EMBED]: convertVerticalEmbedData,
    [rich_content.Node.Type.HTML]: convertHtmlData,
    [rich_content.Node.Type.GIPHY]: convertGiphyData,
    [rich_content.Node.Type.LINK_PREVIEW]: convertLinkPreviewData,
    [rich_content.Node.Type.SOUND_CLOUD]: convertSoundCloudData,
  };
  if (nodeType in conversionFunctions) {
    conversionFunctions[nodeType](newData);
  }
  return newData;
};

export const convertDecorationDataToDraft = (
  decorationType: rich_content.Decoration.Type,
  data
) => {
  const newData = cloneDeep(data);
  const conversionFunctions = {
    [rich_content.Decoration.Type.MENTION]: convertMention,
  };
  if (decorationType in conversionFunctions) {
    conversionFunctions[decorationType](newData);
  }
  return newData;
};

const convertVideoData = data => {
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

const convertDividerData = data => {
  has(data, 'type') && (data.type = toCamelCase(rich_content.DividerData.DividerType[data.type]));
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.DividerConfig.DividerSize[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.DividerConfig.DividerAlignment[data.config.alignment]
    ));
};

const convertImageData = data => {
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

const convertGalleryData = data => {
  has(data, 'config.size') &&
    (data.config.size = toCamelCase(rich_content.GalleryConfig.GallerySize[data.config.size]));
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.GalleryConfig.GalleryAlignment[data.config.alignment]
    ));
};

const convertPollData = data => {
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

const convertVerticalEmbedData = data => {
  has(data, 'type') &&
    (data.type = toCamelCase(rich_content.VerticalEmbedData.VerticalType[data.type]));
};

const convertHtmlData = data => {
  has(data, 'config.alignment') &&
    (data.config.alignment = toCamelCase(
      rich_content.HTMLConfig.HTMLAlignment[data.config.alignment]
    ));
};

const convertGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toCamelCase(
      rich_content.GIphyConfigViewer.GiphyViewerSize[data.configViewer.sizes.desktop]
    ));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toCamelCase(
      rich_content.GIphyConfigViewer.GiphyViewerSize[data.configViewer.sizes.mobile]
    ));
};

const convertLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

const convertSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const convertMention = data => {
  data.mention = { slug: data.slug, name: data.name };
  delete data.name;
  delete data.slug;
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));
