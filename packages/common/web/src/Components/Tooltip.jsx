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
    this.disabled = window.richContentHideTooltips; //used to hide tooltips in tests
    this.tooltipId = 'Tooltip_' + Math.floor(Math.random() * 9999);
  }

  componentWillUnmount() {
    this.hideTooltip();
  }

  showTooltip = e => {
    const { onMouseEnter } = this.props.children?.props;
    onMouseEnter?.(e);
    if (!e.target.disabled) {
      this.timeoutId = setTimeout(() => {
        this.setState({ tooltipVisible: true });
      }, 300);
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
