import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';
import PropTypes from 'prop-types';

class TestApp extends PureComponent {
  renderEditor = () => {
    const { editorState, onEditorChange, locale, localeResource, isMobile } = this.props;
    return (
      <Editor
        onChange={onEditorChange}
        editorState={editorState}
        isMobile={isMobile}
        shouldMockUpload
        locale={locale}
        localeResource={localeResource}
        mockImageIndex={1}
      />
    );
  };

  componentDidUpdate(prevProps) {
    const { contentState } = this.props;
    if (prevProps.contentState !== contentState) {
      this.putContentStateStateOnWindowForTests(contentState);
    }
  }

  putContentStateStateOnWindowForTests = contentState => {
    if (typeof window !== 'undefined') {
      window.__CONTENT_STATE__ = contentState;
      window.__CONTENT_SNAPSHOT__ = {
        ...contentState,
        // blocks keys are random so for snapshot diffing they are changed to indexes
        blocks: contentState.blocks.map((block, index) => ({ ...block, key: index })),
      };
      // eslint-disable-next-line fp/no-delete
      delete window.__CONTENT_SNAPSHOT__.VERSION;
    }
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

TestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
};

export default TestApp;
