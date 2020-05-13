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

class WrapperTestApp extends PureComponent {
  renderEditor = () => {
    const toolbarsConfig = {
      addPluginMenuConfig: {
        showSearch: true,
        splitToSections: true,
      },
    };

    const { contentState, onEditorChange, locale, isMobile } = this.props;
    return (
      <RicosEditor
        plugins={editorPlugins}
        placeholder={'Add some text!'}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        _rcProps={toolbarsConfig} // DO NOT use _rcProps for any other prop
      >
        <RichContentEditor onChange={onEditorChange} />
      </RicosEditor>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;

    return (
      <RicosViewer
        plugins={viewerPlugins}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
      >
        <RichContentViewer seoMode={seoMode} />
      </RicosViewer>
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

WrapperTestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
  testAppConfig: PropTypes.object,
};

export default windowContentStateHoc(WrapperTestApp);
