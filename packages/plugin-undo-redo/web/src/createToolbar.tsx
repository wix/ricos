import createInsertButtons from './insert-buttons';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import React from 'react';

const createToolbar: CreatePluginToolbar = ({ helpers, t, isMobile, settings }) => {
  return {
    TextButtonMapper: isMobile
      ? (pubsub: Pubsub) => ({
          Undo: {
            component: props => <UndoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
          },
          Redo: {
            component: props => <RedoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
          },
        })
      : undefined,
    InsertButtons: createInsertButtons({
      helpers,
      t,
      settings,
      UndoButton,
      RedoButton,
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
