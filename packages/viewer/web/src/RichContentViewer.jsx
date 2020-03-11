import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
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

  getContextualData = ({
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
    siteDomain,
  }) => ({
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
    siteDomain,
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

  render() {
    const { onError } = this.props;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { styles } = this;
      const { textDirection, typeMappers, decorators, inlineStyleMappers, locale } = this.props;

      const wrapperClassName = classNames(styles.wrapper, {
        [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
      });
      const editorClassName = classNames(styles.editor, {
        [styles.rtl]: textDirection === 'rtl',
      });

      const contextualData = this.getContextualData(this.props);

      const output = convertToReact(
        this.state.raw,
        styles,
        textDirection,
        typeMappers,
        contextualData,
        decorators,
        inlineStyleMappers
      );

      return (
        <div className={wrapperClassName} dir={getLangDir(locale)}>
          <div className={editorClassName}>{output}</div>
          <AccessibilityListener isMobile={this.props.isMobile} />
        </div>
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
  seoMode: PropTypes.bool,
  siteDomain: PropTypes.string,
  onError: PropTypes.func,
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
};

export default RichContentViewer;
