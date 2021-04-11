import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  POLL_TYPE,
} from '../../../consts';
import {
  ButtonData,
  DividerData,
  FileData,
  GalleryData,
  GiphyData,
  HTMLData,
  LinkPreviewData,
  MapData,
  VerticalEmbedData,
  VideoData,
  PollData,
} from 'ricos-schema';

export const TO_RICOS_DATA = {
  [LINK_BUTTON_TYPE]: ButtonData,
  [ACTION_BUTTON_TYPE]: ButtonData,
  [DIVIDER_TYPE]: DividerData,
  [FILE_UPLOAD_TYPE]: FileData,
  [GALLERY_TYPE]: GalleryData,
  [GIPHY_TYPE]: GiphyData,
  [HTML_TYPE]: HTMLData,
  [IMAGE_TYPE]: ImageData,
  [IMAGE_TYPE_LEGACY]: ImageData,
  [LINK_PREVIEW_TYPE]: LinkPreviewData,
  [MAP_TYPE]: MapData,
  [VERTICAL_EMBED_TYPE]: VerticalEmbedData,
  [VIDEO_TYPE]: VideoData,
  [VIDEO_TYPE_LEGACY]: VideoData,
  [POLL_TYPE]: PollData,
};
