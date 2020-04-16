import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { plugins as editorPlugins } from './editorPlugins';
import { plugins as viewerPlugins } from './viewerPlugins';

class WrapperTestApp extends PureComponent {
  renderEditor = () => {
    const { editorState, onEditorChange, locale, localeResource, isMobile } = this.props;
    return (
      <RichContentWrapper plugins={editorPlugins} isEditor>
        <RichContentEditor
          onChange={onEditorChange}
          editorState={editorState}
          isMobile={isMobile}
          locale={locale}
          localeResource={localeResource}
        />
      </RichContentWrapper>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;

    return (
      <RichContentWrapper plugin={viewerPlugins}>
        <RichContentViewer
          initialState={contentState}
          isMobile={isMobile}
          locale={locale}
          seoMode={seoMode}
        />
      </RichContentWrapper>
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div>
        <h1>Wrapper Test App</h1>
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

WrapperTestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
};

export default windowContentStateHoc(WrapperTestApp);
