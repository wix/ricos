import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';
import PropTypes from 'prop-types';

class TestApp extends PureComponent {
  renderEditor = () => {
    const { initialState, onEditorChange, locale, localeResource, isMobile } = this.props;
    return (
      <Editor
        onChange={onEditorChange}
        initialState={initialState}
        isMobile={isMobile}
        shouldMockUpload
        locale={locale}
        localeResource={localeResource}
        mockImageIndex={1}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, viewerState, locale } = this.props;
    return <Viewer initialState={viewerState} isMobile={isMobile} locale={locale} />;
  };

  render() {
    const { isMobile } = this.props;
    return isMobile ? (
      <div>
        <h3>Editor</h3>
        <div className="rcWrapper mobile rce">{this.renderEditor()}</div>
        <h3>Viewer</h3>
        <div className="rcWrapper mobile rcv">{this.renderViewer()}</div>
      </div>
    ) : (
      <div className="testApp">
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
  viewerState: PropTypes.object,
  initialState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
};

export default TestApp;
