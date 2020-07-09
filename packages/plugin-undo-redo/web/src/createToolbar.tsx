import createInsertButtons from './insert-buttons';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import React from 'react';
import { Pubsub } from 'wix-rich-content-common';

const createToolbar = config => {
  return {
    TextButtonMapper: config.isMobile
      ? (pubsub: Pubsub) => ({
          Undo: {
            component: props => <UndoButton pubsub={pubsub} t={config.t} {...props} />,
            isMobile: true,
          },
          Redo: {
            component: props => <RedoButton pubsub={pubsub} t={config.t} {...props} />,
            isMobile: true,
          },
        })
      : undefined,
    InsertButtons: createInsertButtons(config),
    name: 'undo-redo',
  };
};

export default createToolbar;
