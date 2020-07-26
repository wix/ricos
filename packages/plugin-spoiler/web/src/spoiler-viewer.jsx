import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, HelpersContext } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip';
import classnames from 'classnames';
import styles from '../statics/styles/spoiler.scss';

class SpoilerViewer extends Component {
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node,
    shouldShowText: PropTypes.bool,
    callAllCallbacks: PropTypes.func,
    stateChangeCallBacks: PropTypes.array,
    dataHook: PropTypes.string,
  };

  static contextType = HelpersContext;

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

  toggleOnHover = onHover => {
    const { isMobile } = this.context;
    !isMobile && this.props.callAllCallbacks({ onHover });
  };

  render() {
    const { children, dataHook } = this.props;
    const { styles, shouldShowText, onHover } = this.state;
    const { isMobile, t } = this.context;
    const spoilerProps = {
      className: classnames({
        [styles.onHoverText]: onHover && !shouldShowText,
        [styles.hideText]: !shouldShowText,
      }),
      onClick: this.handleClick,
      onMouseEnter: () => this.toggleOnHover(true),
      onMouseLeave: () => this.toggleOnHover(false),
      'data-hook': dataHook,
    };
    const text = shouldShowText ? children : <span {...spoilerProps}>{children}</span>;

    return isMobile || shouldShowText ? (
      text
    ) : (
      <Tooltip
        content={t('Spoiler_Reveal_Tooltip')}
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
