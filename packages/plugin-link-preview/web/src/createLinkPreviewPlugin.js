import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { getBlockAtStartOfSelection } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewComponent from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createToolbar';
import { convertLinkPreviewToLink } from '../lib/utils';
import { REMOVE_LINK_PREVIEW } from './consts';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  if (!config[LINK_PREVIEW_TYPE]) {
    config[LINK_PREVIEW_TYPE] = {};
  }
  const {
    [type]: settings,
    setEditorState,
    getEditorState,
    helpers,
    isMobile,
    t,
    ...rest
  } = config;
  const toolbar = createLinkPreviewToolbar({
    settings,
    setEditorState,
    getEditorState,
    helpers,
    isMobile,
    t,
  });

  const keyBindingFn = (event, { getEditorState }) => {
    const editorState = getEditorState();
    const currentBlock = getBlockAtStartOfSelection(editorState);
    const entityKey = currentBlock.getEntityAt(0);
    const entityType = entityKey && editorState.getCurrentContent().getEntity(entityKey).type;
    if (entityType === LINK_PREVIEW_TYPE) {
      if (event.key === 'Backspace') {
        return REMOVE_LINK_PREVIEW;
      }
    }
  };

  const handleKeyCommand = (command, editorState, timestamp, { setEditorState }) => {
    if (command === REMOVE_LINK_PREVIEW) {
      const newState = convertLinkPreviewToLink(editorState);
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const underlyingPlugin = { handleKeyCommand, keyBindingFn };

  const basePluginProps = createBasePlugin(
    {
      component: LinkPreviewComponent,
      type,
      toolbar,
      settings,
      helpers,
      isMobile,
      t,
      getEditorState,
      setEditorState,
      ...rest,
    },
    underlyingPlugin
  );
  return basePluginProps;
};

export { createLinkPreviewPlugin };
