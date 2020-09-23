import { ComponentType } from 'react';
import { ClassNameStrategy, ContainerClassNameStrategy, TranslateFunction, Helpers } from './index';
import { EditorState } from 'draft-js';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  CODE_BLOCK_TYPE,
  DIVIDER_TYPE,
  EMOJI_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HASHTAG_TYPE,
  HEADERS_MARKDOWN_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
  HEADINGS_DROPDOWN_TYPE,
  SPOILER_TYPE,
  EXTERNAL_LINK_TYPE,
  LINK_TYPE,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  EXTERNAL_MENTIONS_TYPE,
  MENTION_TYPE,
  SOUND_CLOUD_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  UNDO_REDO_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  POLL_TYPE,
} from 'ricos-content';

interface PluginMapping {
  component: ComponentType;
  classNameStrategies?: {
    size?: ClassNameStrategy;
    alignment?: ClassNameStrategy;
    textWrap?: ClassNameStrategy;
    container?: ContainerClassNameStrategy;
  };
  elementType?: 'inline' | 'block';
}

export type PluginTypeMapper = () => { [type: string]: PluginMapping };

export type PluginConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName in PluginType]: { config: any; [propName: string]: any };
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  t: TranslateFunction;
  isMobile: boolean;
  helpers: Helpers;
  getEditorState: () => EditorState;
  setEditorState: (editorState: EditorState) => void;
};

export type PluginType =
  | typeof LINK_BUTTON_TYPE
  | typeof ACTION_BUTTON_TYPE
  | typeof CODE_BLOCK_TYPE
  | typeof DIVIDER_TYPE
  | typeof EMOJI_TYPE
  | typeof FILE_UPLOAD_TYPE
  | typeof GALLERY_TYPE
  | typeof GIPHY_TYPE
  | typeof HASHTAG_TYPE
  | typeof HEADERS_MARKDOWN_TYPE
  | typeof HTML_TYPE
  | typeof IMAGE_TYPE
  | typeof IMAGE_TYPE_LEGACY
  | typeof INDENT_TYPE
  | typeof LINE_SPACING_TYPE
  | typeof HEADINGS_DROPDOWN_TYPE
  | typeof SPOILER_TYPE
  | typeof EXTERNAL_LINK_TYPE
  | typeof LINK_TYPE
  | typeof LINK_PREVIEW_TYPE
  | typeof MAP_TYPE
  | typeof EXTERNAL_MENTIONS_TYPE
  | typeof MENTION_TYPE
  | typeof SOUND_CLOUD_TYPE
  | typeof TEXT_COLOR_TYPE
  | typeof TEXT_HIGHLIGHT_TYPE
  | typeof UNDO_REDO_TYPE
  | typeof VERTICAL_EMBED_TYPE
  | typeof VIDEO_TYPE
  | typeof VIDEO_TYPE_LEGACY
  | typeof POLL_TYPE;
