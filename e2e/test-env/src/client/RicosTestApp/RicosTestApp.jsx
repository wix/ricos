import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { default as editorPlugins } from './editorPlugins';
import { default as viewerPlugins } from './viewerPlugins';
import './styles.global.scss';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import theme from '../../../../../examples/main/shared/theme/theme';
import { testVideos } from '../../../../../examples/main/shared/utils/mock';
import { createPreview } from 'wix-rich-content-preview';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { ricosPalettes } from '../../../../tests/resources/palettesExample';

const onVideoSelected = (url, updateEntity) => {
  setTimeout(() => updateEntity(testVideos[1]), 1);
};
const determinePalette = paletteType =>
  paletteType ? (paletteType === 'light' ? ricosPalettes[1] : ricosPalettes[9]) : undefined;
const setBackground = palette => (palette ? { backgroundColor: palette.bgColor } : {});
const setForeground = palette => (palette ? { color: palette.textColor } : {});
class RicosTestApp extends PureComponent {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
    this.state = {
      font: '',
    };
  }

  componentDidMount() {
    this.setState({
      font: getComputedStyle(document.documentElement).getPropertyValue('--ricos-font-family'),
    });
  }

  renderEditor = () => {
    const createToolbarSettings = (addPluginMenuConfig, footerToolbarConfig) => ({
      getToolbarSettings: () => [
        { name: TOOLBARS.SIDE, addPluginMenuConfig },
        {
          name: TOOLBARS.MOBILE,
          addPluginMenuConfig,
        },
        { name: TOOLBARS.FOOTER, footerToolbarConfig },
      ],
    });

    const { contentState, onRicosEditorChange, locale, isMobile, testAppConfig = {} } = this.props;
    const { addPluginMenuConfig, footerToolbarConfig } = testAppConfig.toolbarConfig || {};
    const { skipCssOverride, paletteType } = testAppConfig.theme || {};
    const palette = determinePalette(paletteType);
    return (
      <>
        <RicosEditor
          plugins={editorPlugins(testAppConfig.plugins)}
          placeholder={'Add some text!'}
          content={contentState}
          isMobile={isMobile}
          locale={locale}
          theme={palette && { palette }}
          cssOverride={!skipCssOverride && theme}
          toolbarSettings={createToolbarSettings(addPluginMenuConfig, footerToolbarConfig)}
          onChange={onRicosEditorChange}
        >
          <RichContentEditor config={testAppConfig.pluginsConfig} helpers={{ onVideoSelected }} />
        </RicosEditor>
        The font name is: {this.state.font}.
      </>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode, testAppConfig = {} } = this.props;
    const { skipCssOverride, paletteType } = testAppConfig.theme || {};
    const palette = determinePalette(paletteType);
    return (
      <RicosViewer
        plugins={viewerPlugins(testAppConfig.plugins)}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        theme={palette && { palette }}
        cssOverride={!skipCssOverride && theme}
        seoSettings={seoMode}
        preview={testAppConfig.showDefaultPreview && createPreview()}
      />
    );
  };

  render() {
    const { isMobile, testAppConfig = {} } = this.props;
    const { theme: { paletteType } = {} } = testAppConfig;
    const palette = determinePalette(paletteType);
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`} style={setBackground(palette)}>
        <div>
          <h3 style={setForeground(palette)}>Editor</h3>
          <div className="rcWrapper rce" id="RicosEditorContainer" data-hook="ricos-editor">
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3 style={setForeground(palette)}>Viewer</h3>
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
  onRicosEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
  testAppConfig: PropTypes.object,
};

export default windowContentStateHoc(RicosTestApp);
