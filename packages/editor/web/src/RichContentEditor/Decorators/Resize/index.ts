/* eslint-disable @typescript-eslint/no-explicit-any */
import createDecorator from './createDecorator';
import { EditorPlugin } from 'draft-js-plugins-editor';
import { Ref } from 'react';
import {} from 'draft-js-resizeable-plugin';

export default (config): EditorPlugin & { decorator } => {
  const store: {
    getEditorRef?: Ref<any>;
    getEditorState?: Ref<any>;
    setEditorState?: Ref<any>;
  } = {
    getEditorRef: undefined,
    getEditorState: undefined,
    setEditorState: undefined,
  };
  return {
    initialize: ({ getEditorRef, getEditorState, setEditorState }) => {
      store.getEditorRef = getEditorRef;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorator: createDecorator({ config, store }),
  };
};
