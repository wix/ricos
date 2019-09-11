import { SelectionState, EditorState, Modifier } from 'draft-js';
import { cloneDeep, includes } from 'lodash';
import createBaseComponent from './createBaseComponent';
import createToolbar from './createBaseToolbar';
import createInsertPluginButton from './createBaseInsertPluginButton';
import { simplePubsub } from '../Utils/simplePubsub';
import { getToolbarTheme } from '../Utils/getToolbarTheme';

const updateEntityData = (contentBlock, { getEditorState, setEditorState }, getNewData) => {
  const entityKey = contentBlock.getEntityAt(0);
  if (entityKey) {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const entityData = contentState.getEntity(entityKey).getData();
    const data =
      typeof getNewData === 'function' ? cloneDeep(getNewData(entityData)) : cloneDeep(getNewData);
    contentState.replaceEntityData(entityKey, data);
    setEditorState(editorState);
  }
};

const setData = (contentBlock, { getEditorState, setEditorState }) => {
  return newDataFunc =>
    updateEntityData(contentBlock, { getEditorState, setEditorState }, newDataFunc);
};

const getData = (contentBlock, { getEditorState }) => {
  return () => {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
    return entity.getData();
  };
};

const deleteEntity = (contentBlock, { getEditorState, setEditorState }) => {
  return () => {
    const blockKey = contentBlock.getKey();
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(blockKey);
    const previousBlock = contentState.getBlockBefore(blockKey);
    const selectionRange = new SelectionState({
      anchorOffset: previousBlock.text.length,
      anchorKey: previousBlock.key,
      focusOffset: block.text.length,
      focusKey: blockKey,
    });
    const newContentState = Modifier.removeRange(contentState, selectionRange, 'forward');
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');
    setEditorState(newEditorState);
  };
};

const DEFAULT_SETTINGS = {
  showInsertButtons: true,
};

const createBasePlugin = (config = {}, underlyingPlugin) => {
  const pubsub = simplePubsub();
  const settings = { ...DEFAULT_SETTINGS, ...config.settings };
  const helpers = config.helpers || {};
  const isMobile = config.isMobile || false;
  const { t, anchorTarget, relValue, customStyleFn, getEditorBounds, onOverlayClick } = config;
  const toolbarTheme = { ...getToolbarTheme(config.theme, 'plugin'), ...config.theme };
  const Toolbar =
    config.toolbar &&
    config.toolbar.InlineButtons &&
    createToolbar({
      buttons: {
        all: config.toolbar.InlineButtons,
        hidden: settings.toolbar ? settings.toolbar.hidden : [],
      },
      theme: { ...toolbarTheme, ...config.theme },
      pubsub,
      helpers,
      settings,
      isMobile,
      anchorTarget,
      relValue,
      t,
      name: config.toolbar.name,
      uiSettings: config.uiSettings,
      getToolbarSettings: config.getToolbarSettings,
      getEditorBounds,
    });
  const InsertPluginButtons =
    settings.showInsertButtons &&
    config.toolbar &&
    config.toolbar.InsertButtons &&
    config.toolbar.InsertButtons.map(button => ({
      buttonSettings: button,
      component: createInsertPluginButton({
        blockType: config.type,
        button,
        helpers,
        pubsub,
        settings,
        t,
        isMobile,
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
      settings,
      helpers,
      t,
      anchorTarget,
      relValue,
      isMobile,
      getEditorBounds,
    });

  const DecoratedCompWithBase =
    BaseComponent && config.decorator ? config.decorator(BaseComponent) : BaseComponent;

  const InlineModals = config.inlineModals;

  const TextButtonMapper = config.toolbar && config.toolbar.TextButtonMapper;

  const blockRendererFn = (contentBlock, { getEditorState, setEditorState, getReadOnly }) => {
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
              readOnly: getReadOnly(),
            },
          };
        }
      }
    }
    return null;
  };

  const commonProps = {
    Toolbar,
    InsertPluginButtons,
    InlineModals,
    TextButtonMapper,
    pubsub,
    customStyleFn,
  };

  if (underlyingPlugin) {
    return {
      ...commonProps,
      ...underlyingPlugin,
    };
  } else {
    return {
      ...commonProps,
      blockRendererFn,
    };
  }
};

export default createBasePlugin;
