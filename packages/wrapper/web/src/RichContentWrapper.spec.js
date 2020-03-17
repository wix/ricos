import React from 'react';
import RichContentWrapper from './RichContentWrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
//import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const customRender = (ui, options) => render(ui, { wrapper: RichContentWrapper, ...options });

const driver = {
  wrapper: wrapperProps => ({
    editor: editorProps => customRender(<RichContentEditor {...editorProps} />, wrapperProps || {}),
    viewer: viewerProps => customRender(<RichContentViewer {...viewerProps} />, wrapperProps || {}),
  }),
};

//const plugins = [pluginHashtag()];

describe('Wrapper', () => {
  afterEach(cleanup);

  it('should render editor', () => {
    const { container } = driver.wrapper({ editor: true }).editor();
    expect(container).toBeTruthy();
    expect(container.innerHTML).toContain('#engine_wrapper');
  });

  it('should render editor with locale', () => {
    const { container } = driver.wrapper({ editor: true, locale: 'he' }).editor();
    expect(container).toBeTruthy();
  });

  it('should render viewer', () => {
    const { container } = driver.wrapper().viewer({ initialState: introState });
    expect(container).toBeTruthy();
  });

  it('should fail to render editor with invalid initialState', () => {
    const tryRender = () => driver.nonWorkingEditor({});
    expect(tryRender).toThrow();
  });

  // describe('Editor', () => {
  //   it('should render themeStrategy', () => {
  //     const { container } = driver.wrapper({ editor: true, plugins }).editor();
  //     expect(container.innerHTML).toContain('WrapperEditorModal');
  //   });
  // });
});
