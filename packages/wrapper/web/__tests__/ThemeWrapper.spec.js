import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

import ThemeWrapper from '../src/ThemeWrapper';
//import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';

// const stateExample = {
//   blocks: [
//     {
//       key: 'foo',
//       text: 'myspecial content',
//       type: 'unstyled',
//       depth: 0,
//       entityRanges: [],
//       data: {},
//     },
//   ],
//   entityMap: {},
//   VERSION: '6.6.1',
// };
//const editorState = createWithContent(convertFromRaw(stateExample));

const App = ({ theme }) => <div data-testid="app-title">{JSON.stringify(theme)}</div>;
describe('RceTheme', () => {
  describe('constructor', () => {
    it('should create a new default theme', () => {
      const { getByTestId } = render(
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      );
      expect(getByTestId('app-title').textContent).toBe(JSON.stringify({}));
    });
  });
});

App.propTypes = {
  theme: PropTypes.any,
};
