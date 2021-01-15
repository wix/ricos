import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IoC from '../src/render-infra/ioc-container';

import {
  mergeStyles,
  AccessibilityListener,
  getLangDir,
  GlobalContext,
  Version,
} from 'wix-rich-content-common';

import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import viewerStyles from '../statics/styles/viewer.ricos.scss';
import viewerAlignmentStyles from '../statics/styles/viewer-alignment.ricos.rtlignore.scss';
import rtlStyle from '../statics/styles/viewer-rtl.ricos.rtlignore.scss';

export default class RicosContentViewer extends Component {
  static propTypes = {
    plugins: PropTypes.arrayOf(
      PropTypes.shape({ renderer: PropTypes.func.isRequired, type: PropTypes.string.isRequired })
    ),
    content: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    platform: PropTypes.string,
    textDirection: PropTypes.string,
    direction: PropTypes.string,
    textAlignment: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
    onError: PropTypes.func,
    theme: PropTypes.object.isRequired,
    seoMode: PropTypes.bool,
    disableRightClick: PropTypes.bool,
    iframeSandboxDomain: PropTypes.string,
    isPreview: PropTypes.func,
    onViewerLoaded: PropTypes.func,
    locale: PropTypes.string,
  };

  static defaultProps = {
    theme: {},
    plugins: [],
    locale: 'en',
    onError: err => {
      throw err;
    },
  };

  constructor(props) {
    super(props);
    this.contentRenderer = IoC.getContentRenderer();
    this.contentRenderer.initializePluginRenderMap(this.props.plugins);
    const styles = { ...viewerStyles, ...viewerAlignmentStyles, ...rtlStyle };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {};
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidMount() {
    this.reportDebuggingInfo();
    const { onViewerLoaded, isPreview } = this.props;
    onViewerLoaded?.(!!isPreview?.(), Version.currentVersion);
  }

  reportDebuggingInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if (/debug/i.test(window.location.search) && !window.__RICOS_INFO__) {
      import(
        /* webpackChunkName: debugging-info */
        'wix-rich-content-common/libs/debugging-info'
      ).then(({ reportDebuggingInfo }) => {
        reportDebuggingInfo({
          version: Version.currentVersion,
          reporter: 'Ricos Viewer',
          plugins: this.props.plugins.map(p => p.type),
          getContent: () => this.props.content,
          getConfig: () => ({}),
        });
      });
    }
  }

  render() {
    const { onError } = this.props;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { locale, textDirection, direction } = this.props;
      const { styles } = this;
      const wrapperClassName = classNames(styles.wrapper, {
        [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
      });
      const editorClassName = classNames(styles.editor, {
        [styles.rtl]: textDirection === 'rtl',
      });

      return (
        <GlobalContext.Provider value={this.props}>
          <div className={wrapperClassName} dir={direction || getLangDir(locale)}>
            <div className={editorClassName}>{this.contentRenderer.render(this.props.content)}</div>
            <AccessibilityListener isMobile={this.props.isMobile} />
          </div>
        </GlobalContext.Provider>
      );
    } catch (err) {
      onError(err);
      return null;
    }
  }
}
