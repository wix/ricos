import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
  Context,
  getLangDir,
} from 'wix-rich-content-common';
import { convertToReact } from './utils/convertContentState';
import viewerStyles from '../statics/rich-content-viewer.scss';
import viewerAlignmentStyles from '../statics/rich-content-viewer-alignment.rtlignore.scss';
import rtlStyle from '../statics/rich-content-viewer-rtl.rtlignore.scss';

class RichContentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: RichContentViewer.getInitialState(props.initialState),
      contextualData: this.initContext(),
    };
    const styles = { ...viewerStyles, ...viewerAlignmentStyles, ...rtlStyle };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static getInitialState = props =>
    props.initialState
      ? normalizeInitialState(props.initialState, {
          anchorTarget: props.anchorTarget,
          relValue: props.relValue,
        })
      : {};

  initContext = () => {
    const {
      t,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
      shouldRenderOptimizedImages,
      siteDomain,
    } = this.props;
    return {
      t,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
      shouldRenderOptimizedImages,
      siteDomain,
      disableRightClick: config?.uiSettings?.disableRightClick,
    };
  };

  static getDerivedStateFromProps(props, state) {
    return {
      raw: RichContentViewer.getInitialState(props),
      contextualData: { ...state.contextualData, disabled: props.disabled },
    };
  }

  render() {
    const { styles } = this;
    const { textDirection, typeMappers, decorators, inlineStyleMappers, locale } = this.props;

    const wrapperClassName = classNames(styles.wrapper, {
      [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    const editorClassName = classNames(styles.editor, {
      [styles.rtl]: textDirection === 'rtl',
    });

    const output = convertToReact(
      this.state.raw,
      styles,
      textDirection,
      typeMappers,
      this.state.contextualData,
      decorators,
      inlineStyleMappers
    );

    return (
      <div className={wrapperClassName} dir={getLangDir(locale)}>
        <Context.Provider value={this.state.contextualData}>
          <div className={editorClassName}>{output}</div>
          <AccessibilityListener />
        </Context.Provider>
      </div>
    );
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
  shouldRenderOptimizedImages: PropTypes.bool,
  siteDomain: PropTypes.string,
};

RichContentViewer.defaultProps = {
  theme: {},
  decorators: [],
  typeMappers: [],
  locale: 'en',
};

export default RichContentViewer;
