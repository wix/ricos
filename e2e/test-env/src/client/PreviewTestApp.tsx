import { EditorState } from 'draft-js';
import React, { PureComponent } from 'react';
import { DraftContent } from 'ricos-editor';
import { SEOSettings } from 'wix-rich-content-common';
import { RichContentEditorProps } from 'wix-rich-content-editor';
import Preview from '../../../../examples/main/shared/preview/Preview';
import windowContentStateHoc from './WindowContentStateHoc';

interface Props {
  isMobile: boolean;
  locale?: string;
  contentState?: DraftContent;
  editorState?: EditorState;
  localeResource?: Record<string, string>;
  onEditorChange?: RichContentEditorProps['onChange'];
  seoMode?: SEOSettings;
}

class PreviewTestApp extends PureComponent<Props> {
  renderPreview = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;
    return (
      <Preview initialState={contentState} isMobile={isMobile} locale={locale} seoMode={seoMode} />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`}>
        <div>
          <h3>Preview</h3>
          <div className="rcWrapper rcv">{this.renderPreview()}</div>
        </div>
      </div>
    );
  }
}

export default windowContentStateHoc(PreviewTestApp);
