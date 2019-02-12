import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, AccessibilityListener, normalizeInitialState } from 'wix-rich-content-common';
import { convertToHTML } from './utils/convertToHTML';
import styles from '../statics/rich-content-viewer.scss';

export default class RichContentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: this.getInitialState(props.initialState),
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  getInitialState = initialState =>
    initialState
      ? normalizeInitialState(initialState, {
          anchorTarget: this.props.anchorTarget,
          relValue: this.props.relValue,
        })
      : {};

  componentWillReceiveProps(nextProps) {
    if (this.props.initialState !== nextProps.initialState) {
      this.setState({ raw: this.getInitialState(nextProps.initialState) });
    }
  }

  render() {
    const { styles } = this;
    const {
      theme,
      isMobile,
      textDirection,
      typeMappers,
      decorators,
      anchorTarget,
      relValue,
      config,
    } = this.props;

    const wrapperClassName = classNames(styles.wrapper, {
      [styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    const editorClassName = classNames(styles.editor, {
      [styles.rtl]: textDirection === 'rtl',
    });

    const html = convertToHTML(
      this.state.raw,
      styles,
      textDirection,
      typeMappers,
      { theme, isMobile, anchorTarget, relValue, config },
      decorators
    );

    return (
      <div className={wrapperClassName}>
        <div className={editorClassName}>{html}</div>
        <AccessibilityListener isMobile={isMobile} />
      </div>
    );
  }
}

RichContentViewer.propTypes = {
  initialState: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  platform: PropTypes.string,
  typeMappers: PropTypes.arrayOf(PropTypes.func),
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
};

RichContentViewer.defaultProps = {
  theme: {},
  decorators: [],
  typeMappers: [],
};
