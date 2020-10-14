import { ComponentType } from 'react';
import {
  ClassNameStrategy,
  ContainerClassNameStrategy,
  Pubsub,
  LinkPanelSettings,
  GetToolbarSettings,
  EditorContextType,
  PluginButton,
  ToolbarButtonProps,
  TextButtonMapper,
  GetEditorState,
  SetEditorState,
} from '.';
import {
  ContentBlock,
  EditorProps,
  DraftDecorator,
  CompositeDecorator,
  DraftEditorCommand,
} from 'draft-js';
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
  ACCORDION_TYPE,
  TABLE_TYPE,
} from 'ricos-content';
import { EditorPlugin, PluginFunctions } from 'draft-js-plugins-editor';

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
  | typeof POLL_TYPE
  | typeof ACCORDION_TYPE
  | typeof TABLE_TYPE;

export type BlockRendererFn = (
  contentBlock: ContentBlock,
  {
    getEditorState,
    setEditorState,
  }: { getEditorState: GetEditorState; setEditorState: SetEditorState }
) => {
  component?: ComponentType;
  editable: boolean;
  props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getData: () => any;
    setData: (newData) => void;
    deleteBlock: () => void;
  };
} | null;

export type CreatePluginFunction = (
  config: CreatePluginConfig
) => {
  InlinePluginToolbar?: ComponentType;
  Toolbar?: ComponentType;
  InsertPluginButtons: Pick<PluginButton, 'buttonSettings' | 'component'>[];
  externalizedButtonProps?: ToolbarButtonProps[];
  blockType: PluginType;
  InlineModals?: ComponentType[];
  TextButtonMapper?: TextButtonMapper;
  pubsub: Pubsub;
  customStyleFn?: EditorProps['customStyleFn'];
  decoratorTrigger?: string;
  blockRendererFn: BlockRendererFn;
  underlyingPlugin?: {
    handleKeyCommand: EditorProps['handleKeyCommand'];
    keyBindingFn: EditorProps['keyBindingFn'];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginConfig = any;
// {
//   toolbar?: {
//     hidden?: string[];
//     icons?: {
//       [key: string]: (props) => JSX.Element;
//     };
//   };
// };

export type LegacyPluginConfig = Partial<
  {
    [key in PluginType]: PluginConfig;
  }
> & {
  uiSettings?: UISettings;
  getToolbarSettings?: GetToolbarSettings;
};

export type PluginsDecorator = (component: ComponentType) => ComponentType;

export interface CreatePluginConfig extends EditorContextType, LegacyPluginConfig {
  decorator: PluginsDecorator;
  commonPubsub: Pubsub;
  pluginDefaults: Record<string, unknown>;
}

export type UISettings = {
  linkPanel?: LinkPanelSettings;
  disableRightClick?: boolean;
  blankTargetToggleVisibilityFn?: LinkPanelSettings['blankTargetToggleVisibilityFn'];
  nofollowRelToggleVisibilityFn?: LinkPanelSettings['nofollowRelToggleVisibilityFn'];
};

export interface UnderlyingPlugin
  extends Pick<
    EditorPlugin,
    'handleKeyCommand' | 'onChange' | 'handleReturn' | 'handleBeforeInput'
  > {
  decorators?: DraftDecorator[] | CompositeDecorator[];
  keyBindingFn?(
    e: KeyboardEvent,
    pluginFunctions: PluginFunctions
  ): DraftEditorCommand | 'remove-link-preview' | null;
}
