import { SelectionState, EditorState, Modifier } from '@wix/draft-js';
import includes from 'lodash/includes';
import cloneDeep from 'lodash/cloneDeep';
import { simplePubsub, getToolbarTheme } from '~/Utils';
import createBaseComponent from './baseComponent';
import createToolbar from './baseToolbar';
import createInsertPluginButton from './baseInsertPluginButton';

const updateEntityData = (contentBlock, { getEditorState, setEditorState }, getNewData) => {
  const entityKey = contentBlock.getEntityAt(0);
  if (entityKey) {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const entityData = contentState.getEntity(entityKey).getData();
    const data = typeof getNewData === 'function' ? cloneDeep(getNewData(entityData)) : cloneDeep(getNewData);
    contentState.replaceEntityData(entityKey, data);
    data.config.key = contentBlock.getKey();
    //console.log('setData for ' + entityKey + ' key ' + contentBlock.getKey(), data);
    setEditorState(editorState);
  }
};

const setData = (contentBlock, { getEditorState, setEditorState }) => {
  return newDataFunc => updateEntityData(contentBlock, { getEditorState, setEditorState }, newDataFunc);
};

const getData = (contentBlock, { getEditorState }) => {
  return () => {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
    //const entityKey = contentBlock.getEntityAt(0);
    // console.log('getData for ' + entityKey + ' key ' + contentBlock.getKey(), entity.getData());
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

const createBasePlugin = (config = {}, underlyingPlugin) => {
  const pubsub = simplePubsub();
  const settings = config.settings || {};
  const helpers = config.helpers || {};
  const isMobile = config.isMobile || false;
  const { t, anchorTarget, relValue } = config;
  const toolbarTheme = { ...getToolbarTheme(config.theme, 'plugin'), ...config.theme };
  const Toolbar = config.toolbar && config.toolbar.InlineButtons && createToolbar({
    buttons: {
      all: config.toolbar.InlineButtons,
      hidden: settings.toolbar ? settings.toolbar.hidden : [],
    },
    theme: { ...toolbarTheme, ...config.theme },
    pubsub,
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t,
  });
  const InsertPluginButtons = config.toolbar && config.toolbar.InsertButtons.map(button => (
    createInsertPluginButton({ blockType: config.type, button, helpers, pubsub, t })
  ));
  const PluginComponent = config.component && config.decorator ? config.decorator(config.component) : config.component;

  const CompWithBase = PluginComponent && createBaseComponent(
    { PluginComponent, theme: config.theme, type: config.type, pubsub, settings, helpers, t, anchorTarget });

  const InlineModals = config.inlineModals;

  const blockRenderFunction = (contentBlock, { getEditorState, setEditorState, getReadOnly }) => {
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
            component: CompWithBase,
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
  if (underlyingPlugin) {
    return { Toolbar, InsertPluginButtons, InlineModals, ...underlyingPlugin };
  } else {
    return {
      blockRendererFn: blockRenderFunction,
      Toolbar,
      InsertPluginButtons,
      InlineModals
    };
  }
};

export default createBasePlugin;
