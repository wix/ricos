import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor.jsx';
import Viewer from '../../../../examples/main/shared/viewer/Viewer.jsx';
import { convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

class TestApp extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderEditor = () => {
    const { editorState, locale, localeResource, onEditorChange, isMobile } = this.props;

    return (
      <Editor
        onChange={onEditorChange}
        editorState={editorState}
        isMobile={isMobile}
        shouldMockUpload={true}
        locale={locale}
        localeResource={localeResource}
      />
    );
  };

  renderViewer = () => {
    const { editorState, isMobile } = this.props;
    const viewerState = JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))); //emulate initilState passed in by consumers

    return <Viewer initialState={viewerState} isMobile={isMobile} />;
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
