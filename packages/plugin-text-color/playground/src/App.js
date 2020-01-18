import React from 'react';
import { typeMappe } from 'wix-rich-content-plugin-text-color/dist/module.viewer.cjs';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-plugin-text-color/dist/styles.min.css';
import { RichContentViewer } from 'wix-rich-content-viewer';

const typeMappers = [typeMappe];
function App() {
  const initialState = {
    blocks: [
      {
        key: 'foo',
        text: "I'm a divider",
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '9spf8',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '5nmng',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: 'b4t8s',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'single',
          config: {
            size: 'large',
            alignment: 'center',
            textWrap: 'nowrap',
          },
        },
      },
    },
    VERSION: '6.6.6',
  };

  return (
    <div>
      <h1>viewer playground</h1>
      <RichContentViewer typeMappers={typeMappers} initialState={initialState} />
    </div>
  );
}

export default App;
