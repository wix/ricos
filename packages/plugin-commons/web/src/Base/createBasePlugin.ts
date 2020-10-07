/* eslint-disable @typescript-eslint/no-explicit-any */
import createBaseComponent from './createBaseComponent';
import createAtomicPluginToolbar from './toolbars/createAtomicPluginToolbar';
import createInlinePluginToolbar from './toolbars/createInlinePluginToolbar';
import createInsertPluginButton from './createBaseInsertPluginButton';
import { generateInsertPluginButtonProps } from '../Utils/generateInsertPluginButtonProps';
import {
  deleteBlock,
  setEntityData,
  getToolbarTheme,
  simplePubsub,
  TOOLBARS,
} from 'wix-rich-content-editor-common';
import { ContentBlock } from 'draft-js';
import {
  CreatePluginConfig,
  PluginConfig,
  PluginType,
  UISettings,
  Pubsub,
  CreatePluginToolbar,
  CustomStyleFn,
  PluginButton,
} from 'wix-rich-content-common';
import { CSSProperties, ComponentType, ComponentClass } from 'react';

const getData = (
  contentBlock: ContentBlock,
  { getEditorState }: Pick<CreatePluginConfig, 'getEditorState'>
) => () =>
  getEditorState()
    .getCurrentContent()
    .getEntity(contentBlock.getEntityAt(0))
    .getData();

const setData = (
  contentBlock: ContentBlock,
  { getEditorState, setEditorState }: Pick<CreatePluginConfig, 'getEditorState' | 'setEditorState'>
) => newData =>
  setEditorState(setEntityData(getEditorState(), contentBlock.getEntityAt(0), newData));

const deleteEntity = (
  contentBlock: ContentBlock,
  { getEditorState, setEditorState }: Pick<CreatePluginConfig, 'getEditorState' | 'setEditorState'>
) => () => setEditorState(deleteBlock(getEditorState(), contentBlock.getKey()));

const DEFAULT_SETTINGS = {
  showInsertButtons: true,
};

interface CreateBasePluginConfig extends CreatePluginConfig {
  settings: PluginConfig;
  customStyleFn?: CustomStyleFn;
  onOverlayClick?: ({ e, pubsub }: { e: Event; pubsub: Pubsub }) => void;
  onComponentMount?: ({ e, pubsub }: { e: Event; pubsub: Pubsub }) => void;
  disableRightClick?: UISettings['disableRightClick'];
  type: PluginType;
  defaultPluginData: Record<string, unknown>;
  decoratorTrigger?: string;
  toolbar?: ReturnType<CreatePluginToolbar>;
  component?: ComponentType;
  pluginDecorationProps?: (
    props: any,
    componentData: ComponentType
  ) => {
    onMouseDown: MouseEvent;
    onMouseMove: MouseEvent;
    onMouseLeave: MouseEvent;
    style: CSSProperties;
    width: number;
    containerClassName: string;
  };
  componentWillReceiveDecorationProps?: (
    props: any,
    nextProps: any,
    onPropsChange: (props: any) => void
  ) => void;
  inlineModals?: ComponentClass[];
  legacyType?: PluginType;
}

const createBasePlugin = (
  config: CreateBasePluginConfig,
  underlyingPlugin?: { handleKeyCommand; keyBindingFn }
) => {
  const pubsub = simplePubsub();
  const settings = { ...DEFAULT_SETTINGS, ...config.settings };
  const helpers = config.helpers || {};
  const isMobile = config.isMobile || false;
  const {
    t,
    anchorTarget,
    relValue,
    customStyleFn,
    getEditorBounds,
    onOverlayClick,
    disableRightClick,
    commonPubsub,
    defaultPluginData,
    pluginDefaults,
    onComponentMount,
    languageDir,
    locale,
    theme,
    shouldRenderOptimizedImages,
    iframeSandboxDomain,
    setInPluginEditingMode,
    getInPluginEditingMode,
    getEditorState,
    renderInnerRCE,
    decoratorTrigger,
  } = config;
  defaultPluginData && (pluginDefaults[config.type] = defaultPluginData);
  const toolbarTheme = { ...getToolbarTheme(config.theme, 'plugin'), ...config.theme };
  const InlinePluginToolbar =
    config.toolbar?.InlinePluginToolbarButtons &&
    createInlinePluginToolbar({
      buttons: {
        all: config.toolbar.InlinePluginToolbarButtons,
        hidden: settings?.toolbar?.hidden || [],
      },
      theme: { ...toolbarTheme, ...config.theme },
      commonPubsub,
      isMobile,
      t,
      name: config.toolbar.name,
      getToolbarSettings: config.getToolbarSettings,
      languageDir,
    });
  const Toolbar =
    config?.toolbar?.InlineButtons &&
    createAtomicPluginToolbar({
      buttons: {
        all: config.toolbar.InlineButtons,
        hidden: settings?.toolbar?.hidden || [],
      },
      theme: { ...toolbarTheme, ...config.theme },
      pubsub,
      helpers,
      innerModal: config.innerModal,
      settings,
      isMobile,
      anchorTarget,
      relValue,
      t,
      name: config?.toolbar?.name,
      uiSettings: config.uiSettings,
      getToolbarSettings: config.getToolbarSettings,
      getEditorBounds,
      languageDir,
      getEditorState,
      linkTypes: config.LINK?.linkTypes,
    });

  const externalizedButtonProps = config?.toolbar?.InsertButtons?.map(button =>
    generateInsertPluginButtonProps({
      blockType: config.type,
      button,
      helpers,
      pubsub,
      commonPubsub,
      settings,
      t,
      isMobile,
      pluginDefaults,
      getEditorState,
      setEditorState: editorState => {
        commonPubsub.get('setEditorState')?.(editorState);
      },
      toolbarName: TOOLBARS.INSERT_PLUGIN,
    })
  );
  const InsertPluginButtons: Omit<PluginButton, 'blockType'>[] =
    (settings.showInsertButtons &&
      config?.toolbar?.InsertButtons?.map(button => ({
        buttonSettings: button,
        component: createInsertPluginButton({
          blockType: config.type,
          button,
          helpers,
          pubsub,
          commonPubsub,
          settings,
          t,
          theme,
          isMobile,
          pluginDefaults,
        }),
      }))) ||
    [];
  const PluginComponent = config.component;

  const BaseComponent =
    PluginComponent &&
    createBaseComponent({
      PluginComponent,
      theme: config.theme,
      type: config.type,
      pluginDecorationProps: config.pluginDecorationProps,
      componentWillReceiveDecorationProps: config.componentWillReceiveDecorationProps,
      onOverlayClick,
      pubsub,
      commonPubsub,
      settings,
      helpers,
      t,
      anchorTarget,
      relValue,
      isMobile,
      getEditorBounds,
      disableRightClick,
      onComponentMount,
      locale,
      shouldRenderOptimizedImages,
      iframeSandboxDomain,
      setInPluginEditingMode,
      getInPluginEditingMode,
      renderInnerRCE,
    });

  const DecoratedCompWithBase =
    BaseComponent && config.decorator ? config.decorator(BaseComponent) : BaseComponent;

  const InlineModals = config.inlineModals;

  const TextButtonMapper = config.toolbar && config.toolbar.TextButtonMapper;

  const blockRendererFn = (
    contentBlock: ContentBlock,
    { getEditorState, setEditorState }: CreatePluginConfig
  ) => {
    if (contentBlock.getType() === 'atomic') {
      // TODO subject to change for draft-js next release
      const contentState = getEditorState().getCurrentContent();
      const key = contentBlock.getEntityAt(0);
      if (key) {
        const entity = contentState.getEntity(key);
        const type = entity.getType();
        if (config.type === type || config.legacyType === type) {
          return {
            component: DecoratedCompWithBase,
            editable: false,
            props: {
              getData: getData(contentBlock, { getEditorState }),
              setData: setData(contentBlock, { getEditorState, setEditorState }),
              deleteBlock: deleteEntity(contentBlock, { getEditorState, setEditorState }),
            },
          };
        }
      }
    }
    return null;
  };

  const commonProps = {
    InlinePluginToolbar,
    Toolbar,
    InsertPluginButtons,
    externalizedButtonProps,
    blockType: config.type,
    InlineModals,
    TextButtonMapper,
    pubsub,
    customStyleFn,
    ...(decoratorTrigger ? { decoratorTrigger } : {}),
  };

  return {
    ...commonProps,
    blockRendererFn,
    ...(underlyingPlugin || {}),
  };
};

export default createBasePlugin;
