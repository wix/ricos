import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { default as editorPlugins } from './editorPlugins';
import { default as viewerPlugins } from './viewerPlugins';
import './styles.global.scss';
import theme from '../../../../../examples/main/shared/theme/theme';
import { testVideos } from '../../../../../examples/main/shared/utils/mock';
import {
  mockTestImageUpload,
  mockTestImageNativeUpload,
  mockTestFileUpload,
  mockTestFileNativeUpload,
} from '../../../../../examples/main/shared/utils/fileUploadUtil';
import { createPreview } from 'wix-rich-content-preview';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { FORMATTING_BUTTONS, TOOLBARS } from 'wix-rich-content-editor-common';

const onVideoSelected = (url, updateEntity) => {
  setTimeout(() => updateEntity(testVideos[1]), 1);
};
class RicosTestApp extends PureComponent {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
  }

  renderEditor = () => {
    const createToolbarSettings = (addPluginMenuConfig, footerToolbarConfig) => ({
      getToolbarSettings: ({ textButtons }) => [
        { name: TOOLBARS.SIDE, addPluginMenuConfig },
        {
          name: TOOLBARS.MOBILE,
          addPluginMenuConfig,
        },
        { name: TOOLBARS.FOOTER, footerToolbarConfig },
      ],
    });

    const { contentState, onEditorChange, locale, isMobile, testAppConfig = {} } = this.props;
    const { addPluginMenuConfig, footerToolbarConfig } = testAppConfig.toolbarConfig || {};
    const isNativeUpload = testAppConfig?.uploadConfig?.isNativeUpload;

    const nativeFileUploadConfig = !isNativeUpload
      ? {
          'wix-draft-plugin-file-upload': {
            handleFileSelection: mockTestFileUpload,
          },
        }
      : {
          'wix-draft-plugin-file-upload': {
            onFileSelected: mockTestFileNativeUpload,
          },
        };

    return (
      <RicosEditor
        plugins={editorPlugins(testAppConfig.plugins)}
        placeholder={'Add some text!'}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        cssOverride={theme}
        toolbarSettings={createToolbarSettings(addPluginMenuConfig, footerToolbarConfig)}
      >
        <RichContentEditor
          config={{ ...testAppConfig.pluginsConfig, ...nativeFileUploadConfig }}
          helpers={{
            onVideoSelected,
            handleFileSelection: !isNativeUpload ? mockTestImageUpload : undefined,
            handleFileUpload: isNativeUpload ? mockTestImageNativeUpload : undefined,
          }}
          // using the Ricos onChange causes a delay between the editor and viewer bc of the usage of debounce
          onChange={onEditorChange}
        />
      </RicosEditor>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode, testAppConfig } = this.props;

    return (
      <RicosViewer
        plugins={viewerPlugins(testAppConfig.plugins)}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        cssOverride={theme}
        seoSettings={seoMode}
        preview={testAppConfig.showDefaultPreview && createPreview()}
      />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`}>
        <div>
          <h3>Editor</h3>
          <div className="rcWrapper rce" id="RicosEditorContainer" data-hook="ricos-editor">
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3>Viewer</h3>
          <div
            className="rcWrapper rcv"
            id="RicosViewerContainer"
            data-hook="ricos-viewer"
            ref={this.viewerRef}
          >
            {this.renderViewer()}
            <TextSelectionToolbar container={this.viewerRef.current}>
              {selectedText => <TwitterButton selectedText={selectedText} />}
            </TextSelectionToolbar>
          </div>
        </div>
      </div>
    );
  }
}

RicosTestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
  testAppConfig: PropTypes.object,
};

export default windowContentStateHoc(RicosTestApp);
