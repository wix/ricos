import InlineToolbar from './InlineToolbar';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { simplePubsub } from 'wix-rich-content-common';

const createInlineToolbar = (config = {}) => {
  const {
    name = 'InlineToolbar',
    pubsub = simplePubsub(),
    defaultTextAlignment,
    theme,
    structure = [],
    isMobile = false,
    helpers,
    anchorTarget,
    relValue,
    t,
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    locale,
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    defaultTextAlignment,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    locale,
  };

  return {
    name,
    initialize: ({ getEditorState, setEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      pubsub.set('selection', editorState.getSelection());
      return editorState;
    },
    InlineToolbar: decorateComponentWithProps(InlineToolbar, toolbarProps),
  };
};

export default createInlineToolbar;
