import React from 'react';
import RichContentWrapper from './RichContentWrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import introState from '../../../../e2e/tests/fixtures/intro.json';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const customRender = (ui, options) => render(ui, { wrapper: RichContentWrapper, ...options });

const driver = {
  editor: ({ ...props }) => customRender(<RichContentEditor {...props} />, { editor: true }),
  viewer: ({ ...props }) => customRender(<RichContentViewer {...props} />, {}),
};

describe('Wrapper', () => {
  afterEach(cleanup);

  it('should render editor', () => {
    const { container } = driver.editor({});
    expect(container).toBeTruthy();
  });

  it('should render editor with locale', () => {
    const { container } = driver.editor({ locale: 'he' });
    expect(container).toBeTruthy();
  });

  it('should render viewer', () => {
    const { container } = driver.viewer({ initialState: introState });
    expect(container).toBeTruthy();
  });
});
