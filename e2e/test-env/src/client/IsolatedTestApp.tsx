import React, { PureComponent } from 'react';
import { EditorState, RichContentEditor, RichContentEditorProps } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import windowContentStateHoc from './WindowContentStateHoc';
import { DraftContent, SEOSettings } from 'wix-rich-content-common';

interface Props {
  isMobile: boolean;
  locale?: string;
  contentState?: DraftContent;
  editorState?: EditorState;
  localeResource?: Record<string, string>;
  onEditorChange?: RichContentEditorProps['onChange'];
  seoMode?: SEOSettings;
}

class IsolatedTestApp extends PureComponent<Props> {
  renderEditor = () => {
    const { editorState, onEditorChange, locale, localeResource, isMobile } = this.props;
    return (
      <RichContentEditor
        onChange={onEditorChange}
        editorState={editorState}
        isMobile={isMobile}
        locale={locale}
        localeResource={localeResource}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;

    return (
      <RichContentViewer
        initialState={contentState}
        isMobile={isMobile}
        locale={locale}
        seoMode={seoMode}
      />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div>
        <h1>Isolated Test App</h1>
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
      </div>
    );
  }
}

export default windowContentStateHoc(IsolatedTestApp);
