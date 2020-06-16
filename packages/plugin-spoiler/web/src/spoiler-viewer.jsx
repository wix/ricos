import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { Tooltip } from 'wix-rich-content-editor-common';
import classnames from 'classnames';
import styles from '../statics/styles/spoiler.scss';

class SpoilerViewer extends Component {
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node,
    isMobile: PropTypes.bool,
    shouldShowText: PropTypes.bool,
    callAllCallbacks: PropTypes.func,
    stateChangeCallBacks: PropTypes.array,
    dataHook: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = { styles: mergeStyles({ styles, theme }) };
  }

  componentWillReceiveProps(nextprops) {
    const { stateChangeCallBacks } = nextprops;
    stateChangeCallBacks.push(newState => this.setState(newState));
  }

  handleClick = event => {
    event.preventDefault();
    this.props.callAllCallbacks({ shouldShowText: true });
  };

  handleOnMouseEnter = () => {
    this.props.callAllCallbacks({ onHover: true });
  };

  handleOnMouseLeave = () => {
    this.props.callAllCallbacks({ onHover: false });
  };

  render() {
    const { children, isMobile, dataHook } = this.props;
    const { styles, shouldShowText, onHover } = this.state;
    const spoilerProps = {
      className: classnames({
        [styles.onHoverText]: onHover && !shouldShowText,
        [styles.hideText]: !shouldShowText,
      }),
      onClick: this.handleClick,
      onMouseEnter: this.handleOnMouseEnter,
      onMouseLeave: this.handleOnMouseLeave,
      'data-hook': dataHook,
    };
    const text = shouldShowText ? children : <span {...spoilerProps}>{children}</span>;
    return isMobile || shouldShowText ? (
      text
    ) : (
      <Tooltip content={'Click to reveal'} hideArrow followMouse>
        {text}
      </Tooltip>
    );
  }
}

export default SpoilerViewer;
