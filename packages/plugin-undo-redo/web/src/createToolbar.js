import createInsertButtons from './insert-buttons';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import React from 'react';

export default function createToolbar(config) {
  const { helpers, t, isMobile, settings, editorStateWrapper } = config;
  const TextButtonMapper = pubsub =>
    isMobile
      ? {
          Undo: {
            component: props => <UndoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
          },
          Redo: {
            component: props => <RedoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
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
