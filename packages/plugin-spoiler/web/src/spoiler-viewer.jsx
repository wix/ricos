import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, Tooltip } from 'wix-rich-content-common';
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
  componentDidMount() {
    const { stateChangeCallBacks } = this.props;
    stateChangeCallBacks.push(newState => this.setState(newState));
  }

  componentWillReceiveProps(nextprops) {
    const { stateChangeCallBacks } = nextprops;
    stateChangeCallBacks.push(newState => this.setState(newState));
  }

  handleClick = event => {
    event.preventDefault();
    this.props.callAllCallbacks({ shouldShowText: true });
  };

  toggleOnHover = () => {
    const { onHover } = this.state;
    !this.props.isMobile && this.props.callAllCallbacks({ onHover: !onHover });
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
      onMouseEnter: this.toggleOnHover,
      onMouseLeave: this.toggleOnHover,
      'data-hook': dataHook,
    };
    const text = shouldShowText ? children : <span>{children}</span>;
    return isMobile || shouldShowText ? (
      text
    ) : (
      <Tooltip
        content={'Click to reveal'}
        childrenProps={spoilerProps}
        tooltipOffset={{ y: -15 }}
        hideArrow
        followMouse
      >
        {text}
      </Tooltip>
    );
  }
}

export default SpoilerViewer;
