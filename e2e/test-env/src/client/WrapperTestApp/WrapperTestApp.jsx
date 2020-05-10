import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
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
    const { editorState, onEditorChange, locale, isMobile } = this.props;
    const rcProps = {
      onChange: onEditorChange,
      editorState,
      toolbarsConfig,
    };
    return (
      <RichContentWrapper
        plugins={editorPlugins}
        locale={locale}
        isMobile={isMobile}
        placeholder={'Add some text!'}
        isEditor
        rcProps={rcProps}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;
    const rcProps = {
      seoMode,
    };
    return (
      <RichContentWrapper
        plugins={viewerPlugins}
        contentState={contentState}
        locale={locale}
        isMobile={isMobile}
        rcProps={rcProps}
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
