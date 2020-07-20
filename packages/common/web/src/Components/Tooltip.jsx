/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { getTooltipStyles } from './tooltipStyles';
import ToolTip from 'react-portal-tooltip';
import { isMobileContext } from '../Utils/contexts';

class Tooltip extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    tooltipOffset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'light', 'dark']),
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    followMouse: PropTypes.bool,
    hideArrow: PropTypes.bool,
    childrenProps: PropTypes.object,
  };

  static defaultProps = {
    type: 'dark',
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
    childrenProps: {},
  };

  state = {
    tooltipVisible: false,
  };

  static contextType = isMobileContext;

  onMouseEnter = e => {
    const { onMouseEnter } = this.props.childrenProps;
    onMouseEnter?.(e);
    this.showTooltip(e);
  };

  onMouseLeave = e => {
    const { onMouseLeave } = this.props.childrenProps;
    onMouseLeave?.(e);
    this.hideTooltip();
  };

  componentWillUnmount() {
    this.hideTooltip();
  }

  showTooltip = e => {
    if (!e.target.disabled) {
      this.timeoutId = setTimeout(() => {
        this.setState({ tooltipVisible: true });
      }, 300);
    }
  };

  hideTooltip = () => {
    clearTimeout(this.timeoutId);
    this.setState({ tooltipVisible: false });
  };

  handleClick = e => {
    const { onClick } = this.props.childrenProps;
    onClick?.(e);
    this.hideTooltip();
  };

  render() {
    const { children, content, type, place, tooltipOffset, followMouse, childrenProps, hideArrow } =
      this.props || {};
    const style = getTooltipStyles(type, followMouse, tooltipOffset, place);
    const isMobile = this.context;
    const { id } = children?.props;

    const wrapperProps = {
      ...childrenProps,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.handleClick,
      ref: !id
        ? element => {
            this.element = element;
          }
        : undefined,
    };

    return (
      <>
        {isMobile
          ? children
          : React.Children.map(children, child => React.cloneElement(child, wrapperProps))[0]}
        {(this.element || id) && !isMobile && !window.richContentHideTooltips ? (
          <ToolTip
            active={this.state.tooltipVisible}
            parent={this.element || '#' + id}
            position={place}
            arrow={!hideArrow ? 'center' : null}
            style={style}
            tooltipTimeout={10}
            key="tooltip"
          >
            {content}
          </ToolTip>
        ) : null}
      </>
    );
  }
}

export default Tooltip;
