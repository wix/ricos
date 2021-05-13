import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';
import windowContentStateHoc from './WindowContentStateHoc';
import { EditorState } from 'draft-js';
import { DraftContent } from 'ricos-editor';
import { SEOSettings } from 'wix-rich-content-common';
import { RichContentEditorProps } from 'wix-rich-content-editor';
import { TestAppConfig } from '../../../../examples/main/src/types';

interface Props {
  isMobile: boolean;
  locale?: string;
  contentState?: DraftContent;
  editorState?: EditorState;
  localeResource?: Record<string, string>;
  onEditorChange?: RichContentEditorProps['onChange'];
  seoMode?: SEOSettings;
  testAppConfig?: TestAppConfig;
}

class TestApp extends PureComponent<Props> {
  renderEditor = () => {
    const {
      editorState,
      onEditorChange,
      locale,
      localeResource,
      isMobile,
      testAppConfig,
    } = this.props;
    return (
      <Editor
        onChange={onEditorChange}
        editorState={editorState}
        isMobile={isMobile}
        shouldMockUpload
        locale={locale}
        localeResource={localeResource}
        mockImageIndex={1}
        testAppConfig={testAppConfig}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;
    return (
      <Viewer initialState={contentState} isMobile={isMobile} locale={locale} seoMode={seoMode} />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`}>
        <div>
          <h3>Editor</h3>
          <div className="rcWrapper rce">{this.renderEditor()}</div>
        </div>
        <div>
          <h3>Viewer</h3>
          <div className="rcWrapper rcv">{this.renderViewer()}</div>
        </div>
      </div>
    );
  }
}

export default windowContentStateHoc(TestApp);
