import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
  Context,
} from 'wix-rich-content-common';
import { convertToReact } from './utils/convertContentState';
import styles from '../statics/rich-content-viewer.scss';

export default class RichContentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: RichContentViewer.getInitialState(props.initialState),
      contextualData: this.initContext(),
    };
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
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
    } = this.props;
    return {
      theme,
      isMobile,
      anchorTarget,
      relValue,
      config,
      helpers,
      locale,
      disabled,
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
    const { textDirection, typeMappers, decorators, inlineStyleMappers } = this.props;

    const wrapperClassName = clsx(styles.wrapper, {
      [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    const editorClassName = clsx(styles.editor, {
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
      <div className={wrapperClassName}>
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
  locale: PropTypes.string,
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
  theme: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  disabled: PropTypes.bool,
};

RichContentViewer.defaultProps = {
  theme: {},
  decorators: [],
  typeMappers: [],
  locale: 'en',
};
