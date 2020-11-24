import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
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

  static contextType = GlobalContext;

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
    this.showText();
  };

  showText = () => {
    this.props.callAllCallbacks({ shouldShowText: true });
  };

  toggleOnHover = onHover => {
    const { isMobile } = this.context;
    !isMobile && this.props.callAllCallbacks({ onHover });
  };

  onMouseEnter = () => this.toggleOnHover(true);
  onMouseLeave = () => this.toggleOnHover(false);
  onKeyUp = e => {
    if (e.key === 'Enter') {
      this.showText();
    }
  };

  render() {
    const { children, dataHook } = this.props;
    const { styles, shouldShowText, onHover } = this.state;
    const { t } = this.context;

    return shouldShowText ? (
      children
    ) : (
      <Tooltip
        content={t('Spoiler_Reveal_Tooltip')}
        tooltipOffset={{ y: -15 }}
        hideArrow
        followMouse
      >
        <span
          className={classnames(styles.hideText, {
            [styles.onHoverText]: onHover,
          })}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onKeyUp={this.onKeyUp}
          onClick={this.handleClick}
          role={'button'}
          tabIndex={0}
          data-hook={dataHook}
        >
          {children}
        </span>
      </Tooltip>
    );
  }
}

export default SpoilerViewer;
