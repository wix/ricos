import { includes } from 'lodash';
import createBaseComponent from './createBaseComponent';
import createAtomicPluginToolbar from './toolbars/createAtomicPluginToolbar';
import createInlinePluginToolbar from './toolbars/createInlinePluginToolbar';
import createInsertPluginButton from './createBaseInsertPluginButton';
import { deleteBlock, setEntityData } from '../Utils/draftUtils';
import { simplePubsub } from '../Utils/simplePubsub';
import { getToolbarTheme } from '../Utils/getToolbarTheme';

const getData = (contentBlock, { getEditorState }) => () =>
  getEditorState()
    .getCurrentContent()
    .getEntity(contentBlock.getEntityAt(0))
    .getData();

const setData = (contentBlock, { getEditorState, setEditorState }) => newData =>
  setEditorState(setEntityData(getEditorState(), contentBlock.getEntityAt(0), newData));

const deleteEntity = (contentBlock, { getEditorState, setEditorState }) => () =>
  setEditorState(deleteBlock(getEditorState(), contentBlock.getKey()));

const DEFAULT_SETTINGS = {
  showInsertButtons: true,
};

const createBasePlugin = (config = {}, underlyingPlugin) => {
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
    initialIntent,
    languageDir,
    locale,
    shouldRenderOptimizedImages,
    siteDomain,
    setInPluginEditingMode,
    getInPluginEditingMode,
    getEditorState,
    setEditorState,
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
      settings,
      isMobile,
      anchorTarget,
      relValue,
      t,
      name: config?.toolbar?.name,
      uiSettings: config.uiSettings,
      getToolbarSettings: config.getToolbarSettings,
      getEditorBounds,
      initialIntent,
      languageDir,
      locale,
      shouldRenderOptimizedImages,
      siteDomain,
      setInPluginEditingMode,
      getInPluginEditingMode,
      getEditorState,
      setEditorState,
    });
  const InsertPluginButtons =
    settings.showInsertButtons &&
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
        isMobile,
        pluginDefaults,
        initialIntent,
        languageDir,
        locale,
        shouldRenderOptimizedImages,
        siteDomain,
        setInPluginEditingMode,
        getInPluginEditingMode,
        getEditorState,
        setEditorState,
      }),
    }));
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
      initialIntent,
      languageDir,
      locale,
      shouldRenderOptimizedImages,
      siteDomain,
      setInPluginEditingMode,
      getInPluginEditingMode,
      getEditorState,
      setEditorState,
    });

  const DecoratedCompWithBase =
    BaseComponent && config.decorator ? config.decorator(BaseComponent) : BaseComponent;

  const InlineModals = config.inlineModals;

  const TextButtonMapper = config.toolbar && config.toolbar.TextButtonMapper;

  const blockRendererFn = (contentBlock, { getEditorState, setEditorState }) => {
    if (contentBlock.getType() === 'atomic') {
      // TODO subject to change for draft-js next release
      const contentState = getEditorState().getCurrentContent();
      const key = contentBlock.getEntityAt(0);
      if (key) {
        const entity = contentState.getEntity(key);
        const type = entity.getType();
        const pluginTypes = [config.type, config.legacyType];
        if (includes(pluginTypes, type)) {
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

  let commonProps = {
    InlinePluginToolbar,
    Toolbar,
    InsertPluginButtons,
    InlineModals,
    TextButtonMapper,
    pubsub,
    customStyleFn,
  };

  if (decoratorTrigger) {
    commonProps = {
      ...commonProps,
      decoratorTrigger,
    };
  }

  return {
    ...commonProps,
    blockRendererFn,
    ...(underlyingPlugin || {}),
  };
};

export default createBasePlugin;
