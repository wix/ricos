import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { default as editorPlugins } from './editorPlugins';
import { default as viewerPlugins } from './viewerPlugins';
import './styles.global.scss';
import theme from '../../../../../examples/main/shared/theme/theme';
import { testVideos } from '../../../../../examples/main/shared/utils/mock';
import {
  TextSelectionToolbar,
  ViewerInlineToolBar,
  TwitterButton,
} from 'wix-rich-content-text-selection-toolbar';

const onVideoSelected = (url, updateEntity) => {
  setTimeout(() => updateEntity(testVideos[1]), 1);
};
class RicosTestApp extends PureComponent {
  constructor() {
    super();
    this.viewerRef = React.createRef();
  }

  componentDidMount() {
    this.viewerRect = this.viewerRectFunction();
  }

  viewerRectFunction = () => {
    return this.viewerRef.current
      ? this.viewerRef.current.getBoundingClientRect()
      : { top: null, left: null };
  };

  renderEditor = () => {
    const createToolbarSettings = addPluginMenuConfig => ({
      getToolbarSettings: () => [
        { name: 'SIDE', addPluginMenuConfig },
        { name: 'MOBILE', addPluginMenuConfig },
      ],
    });

    const { contentState, onEditorChange, locale, isMobile, testAppConfig = {} } = this.props;
    const { addPluginMenuConfig } = testAppConfig.toolbarConfig || {};
    return (
      <RicosEditor
        plugins={editorPlugins(testAppConfig.plugins)}
        placeholder={'Add some text!'}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        cssOverride={theme}
        toolbarSettings={createToolbarSettings(addPluginMenuConfig)}
      >
        <RichContentEditor
          onChange={onEditorChange}
          config={testAppConfig.pluginsConfig}
          helpers={{ onVideoSelected }}
        />
      </RicosEditor>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode, testAppConfig } = this.props;
    this.viewerRect = this.viewerRectFunction();

    return [
      <RicosViewer
        key={'ricos'}
        plugins={viewerPlugins(testAppConfig.plugins)}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        cssOverride={theme}
      >
        <RichContentViewer seoMode={seoMode} />
      </RicosViewer>,
      <TextSelectionToolbar
        key={'selection'}
        viewerRect={{
          top: this.viewerRect.top,
          left: this.viewerRect.left,
        }}
        ToolBar={ViewerInlineToolBar}
      >
        {selectedText => <TwitterButton selectedText={selectedText} />}
      </TextSelectionToolbar>,
    ];
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`}>
        <div>
          <h3>Editor</h3>
          <div className="rcWrapper rce" id="RicosEditorContainer">
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3>Viewer</h3>
          <div className="rcWrapper rcv" id="RicosViewerContainer" ref={this.viewerRef}>
            {this.renderViewer()}
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
