import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';

class TestApp extends PureComponent {
  renderEditor = () => {
    const {
      initialState,
      onEditorChange,
      locale,
      localeResource,
      isMobile,
      additionalConfig,
    } = this.props;
    return (
      <Editor
        onChange={onEditorChange}
        initialState={initialState}
        isMobile={isMobile}
        shouldMockUpload
        locale={locale}
        localeResource={localeResource}
        mockImageIndex={1}
        additionalConfig={additionalConfig}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, viewerState, locale, additionalConfig } = this.props;
    return (
      <Viewer
        additionalConfig={additionalConfig}
        initialState={viewerState}
        isMobile={isMobile}
        locale={locale}
      />
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
  viewerState: PropTypes.object,
  initialState: PropTypes.object,
  localeResource: PropTypes.object,
  additionalConfig: PropTypes.object,
  onEditorChange: PropTypes.func,
};

export default TestApp;
