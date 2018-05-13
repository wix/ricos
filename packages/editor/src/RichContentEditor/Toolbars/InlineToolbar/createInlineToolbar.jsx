import decorateComponentWithProps from 'decorate-component-with-props';
import InlineToolbar from './InlineToolbar';
import { simplePubsub } from 'wix-rich-content-common';

const createInlineToolbar = (config = {}) => {
  const {
    name = 'InlineToolbar',
    pubsub = simplePubsub(),
    theme,
    structure = [],
    isMobile = false,
    helpers,
    anchorTarget,
    relValue,
    t,
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t
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
