import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';

class TestApp extends PureComponent {
  renderEditor = () => {
    // eslint-disable-next-line react/prop-types
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
    // eslint-disable-next-line react/prop-types
    const { isMobile, viewerState, locale } = this.props;
    return <Viewer initialState={viewerState} isMobile={isMobile} locale={locale} />;
  };

  render() {
    return (
      <>
        Editor
        {this.renderEditor()}
        Viewer
        {this.renderViewer()}
      </>
    );
  }
}

export default TestApp;
