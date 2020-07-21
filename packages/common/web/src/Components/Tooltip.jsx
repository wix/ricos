/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { getTooltipStyles } from './tooltipStyles';
import ToolTip from 'react-portal-tooltip';
import { HelpersContext } from '../Utils/contexts';

class Tooltip extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    tooltipOffset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'light', 'dark']),
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    followMouse: PropTypes.bool,
    hideArrow: PropTypes.bool,
  };

  static defaultProps = {
    type: 'dark',
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
  };

  state = {
    tooltipVisible: false,
  };

  static contextType = HelpersContext;

  componentDidMount() {
    this.tooltipId = 'Tooltip_' + Math.floor(Math.random() * 9999);
  }

  componentDidUpdate() {
    this.disabled = window.richContentHideTooltips; //used to hide tooltips in tests
    // this.updateTooltipPosition();
  }

  componentWillUnmount() {
    this.hideTooltip();
  }

  showTooltip = e => {
    const { onMouseEnter } = this.props.children?.props;
    onMouseEnter?.(e);
    // this.mouseCoordinates = { x: e.clientX, y: e.clientY };
    if (!e.target.disabled) {
      this.timeoutId = setTimeout(() => {
        this.setState({ tooltipVisible: true });
        // this.updateTooltipPosition(e);
      }, 300);
    }
  };

  onMouseMove = e => {
    // this.mouseCoordinates = { x: e.clientX, y: e.clientY };
    this.updateTooltipPosition(e);
    const { onMouseMove } = this.props.children?.props;
    onMouseMove?.(e);
  };

  updateTooltipPosition = e => {
    if (this.state.tooltipVisible) {
      const element = document.querySelector('[class=ToolTipPortal]');
      const { width, height } = element.children[0].getBoundingClientRect();
      element.children[0].style.top = `${e.clientY - height - 25}px`;
      element.children[0].style.left = `${e.clientX - width / 2}px`;
    }
  };

  onMouseLeave = e => {
    const { onMouseLeave } = this.props.children?.props;
    onMouseLeave?.(e);
    this.hideTooltip();
  };

  handleClick = e => {
    const { onClick } = this.props.children?.props;
    onClick?.(e);
    this.hideTooltip();
  };

  hideTooltip = () => {
    clearTimeout(this.timeoutId);
    this.setState({ tooltipVisible: false });
  };

  render() {
    const { children, content, type, place, tooltipOffset, followMouse, hideArrow } = this.props;
    const style = getTooltipStyles(type, followMouse, tooltipOffset, place);
    const { isMobile } = this.context;
    const wrapperProps = {
      onMouseEnter: this.showTooltip,
      onMouseLeave: this.onMouseLeave,
      onMouseMove: followMouse ? this.onMouseMove : undefined,
      onClick: this.handleClick,
      'data-tooltipid': this.tooltipId,
    };

    return isMobile ? (
      children
    ) : (
      <>
        {React.cloneElement(React.Children.only(children), wrapperProps)}
        {this.tooltipId && !this.disabled ? (
          <ToolTip
            active={this.state.tooltipVisible}
            parent={`[data-tooltipid=${this.tooltipId}]`}
            position={place}
            arrow={!hideArrow ? 'center' : null}
            style={style}
            tooltipTimeout={10}
          >
            {content}
          </ToolTip>
        ) : null}
      </>
    );
  }
}

export default Tooltip;
