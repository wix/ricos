import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  SPOILER_TYPE,
  GlobalContext,
  Version,
} from 'wix-rich-content-common';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToReact } from './utils/convertContentState';
import viewerStyles from '../statics/rich-content-viewer.scss';
import viewerAlignmentStyles from '../statics/rich-content-viewer-alignment.rtlignore.scss';
import rtlStyle from '../statics/rich-content-viewer-rtl.rtlignore.scss';
import { deprecateHelpers } from 'wix-rich-content-common/dist/lib/deprecateHelpers.cjs.js';
import { combineMappers } from './utils/combineMappers';

class RichContentViewer extends Component {
  constructor(props) {
    super(props);
    const styles = { ...viewerStyles, ...viewerAlignmentStyles, ...rtlStyle };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      raw: {},
    };
    this.typeMappers = combineMappers(props.typeMappers);
  }

  static getInitialState = props => {
    const {
      initialState,
      anchorTarget,
      relValue,
      normalize: { disableInlineImages = false, removeInvalidInlinePlugins = false },
    } = props;
    return initialState
      ? normalizeInitialState(initialState, {
          anchorTarget,
          relValue,
          disableInlineImages,
          removeInvalidInlinePlugins,
        })
      : {};
  };

  getContextualData = (
    {
      t,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
      seoMode,
      iframeSandboxDomain,
    },
    contentState
  ) => ({
    t,
    theme,
    isMobile,
    anchorTarget,
    relValue,
    config,
    helpers: deprecateHelpers(helpers, config),
    locale,
    disabled,
    seoMode,
    contentState,
    iframeSandboxDomain,
    disableRightClick: config?.uiSettings?.disableRightClick,
  });

  static getDerivedStateFromProps(props) {
    return {
      raw: RichContentViewer.getInitialState(props),
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidMount() {
    this.reportDebuggingInfo();
  }

  reportDebuggingInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if (/debug/i.test(window.location.search) && !window.__RICOS_INFO__) {
      import(
        /* webpackChunkName: debugging-info */
        'wix-rich-content-common/dist/lib/debugging-info.cjs.js'
      ).then(({ reportDebuggingInfo }) => {
        reportDebuggingInfo({
          version: Version.currentVersion,
          reporter: 'Rich Content Viewer',
          plugins: Object.keys(this.typeMappers),
          getContent: () => this.props.initialState,
          getConfig: () => this.props.config,
        });
      });
    }
  }

  render() {
    const { onError, config = {} } = this.props;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { styles } = this;
      const {
        textDirection,
        decorators,
        inlineStyleMappers,
        locale,
        addAnchors,
        isMobile,
        t,
      } = this.props;
      const wrapperClassName = classNames(styles.wrapper, {
        [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
      });
      const editorClassName = classNames(styles.editor, {
        [styles.rtl]: textDirection === 'rtl',
      });

      const initSpoilers = config[SPOILER_TYPE]?.initSpoilersContentState;
      const contextualData = this.getContextualData(this.props, this.state.raw);
      const output = convertToReact(
        styles,
        textDirection,
        this.typeMappers,
        contextualData,
        decorators,
        inlineStyleMappers,
        initSpoilers,
        { addAnchors }
      );
      return (
        <GlobalContext.Provider value={{ isMobile, t }}>
          <div className={wrapperClassName} dir={getLangDir(locale)}>
            <div className={editorClassName}>{output}</div>
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

RichContentViewer.propTypes = {
  initialState: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  platform: PropTypes.string,
  locale: PropTypes.string.isRequired,
  typeMappers: PropTypes.arrayOf(PropTypes.func),
  inlineStyleMappers: PropTypes.arrayOf(PropTypes.func),
  decorators: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        getDecorations: PropTypes.func.isRequired,
        getComponentForKey: PropTypes.func.isRequired,
        getPropsForKey: PropTypes.func.isRequired,
      }),
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        strategy: PropTypes.func.isRequired,
      }),
    ])
  ),
  t: PropTypes.func,
  theme: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  disabled: PropTypes.bool,
  seoMode: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  iframeSandboxDomain: PropTypes.string,
  onError: PropTypes.func,
  addAnchors: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  normalize: PropTypes.shape({
    disableInlineImages: PropTypes.bool,
    removeInvalidInlinePlugins: PropTypes.bool,
  }),
};

RichContentViewer.defaultProps = {
  theme: {},
  decorators: [],
  typeMappers: [],
  inlineStyleMappers: [],
  locale: 'en',
  onError: err => {
    throw err;
  },
  normalize: {},
};

export default RichContentViewer;
