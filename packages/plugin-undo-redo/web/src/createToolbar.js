import createInsertButtons from './insert-buttons';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import React from 'react';

export default function createToolbar({ helpers, t, isMobile, settings, editorStateWrapper }) {
  const TextButtonMapper = pubsub =>
    isMobile
      ? {
          Undo: {
            component: props => <UndoButton pubsub={pubsub} {...props} />,
            isMobile: true,
            position: {
              mobile: 17,
            },
          },
          Redo: {
            component: props => <RedoButton pubsub={pubsub} {...props} />,
            isMobile: true,
            position: {
              mobile: 18,
            },
          },
        }
      : {};
  return {
    TextButtonMapper,
    InsertButtons: createInsertButtons({
      helpers,
      t,
      isMobile,
      settings,
      UndoButton,
      RedoButton,
      editorStateWrapper,
    }),
    name: 'undo-redo',
  };
}
