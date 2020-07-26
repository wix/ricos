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
    isError: PropTypes.bool,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    followMouse: PropTypes.bool,
    hideArrow: PropTypes.bool,
  };

  static defaultProps = {
    isError: false,
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
  };

  state = {
    tooltipVisible: false,
  };

  static contextType = HelpersContext;

  componentDidUpdate() {
    this.disabled = window.richContentHideTooltips; //used to hide tooltips in tests
  }

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

  onMouseMove = e => {
    if (this.props.followMouse) {
      this.updateTooltipPosition(e.clientX, e.clientY);
    }
  };

  updateTooltipPosition = (x, y) => {
    const element = document.querySelector('.ToolTipPortal > div');
    if (element) {
      const { offsetWidth: width, offsetHeight: height } = element;
      element.style.left = `${x - width / 2}px`;
      element.style.top = `${y - height - 25}px`;
    }
  };

  hideTooltip = () => {
    clearTimeout(this.timeoutId);
    this.setState({ tooltipVisible: false });
  };

  wrappChildrenProp = (propName, func) => {
    return {
      [propName]: e => {
        func(e);
        this.props.children.props[propName]?.(e);
      },
    };
  };

  tooltipId = 'Tooltip_' + Math.floor(Math.random() * 9999);

  wrapperProps = {
    ...this.wrappChildrenProp('onMouseEnter', this.showTooltip),
    ...this.wrappChildrenProp('onMouseLeave', this.hideTooltip),
    ...this.wrappChildrenProp('onClick', this.hideTooltip),
    ...this.wrappChildrenProp('onMouseMove', this.onMouseMove),
    'data-tooltipid': this.tooltipId,
  };

  render() {
    const { children, content, isError, place, tooltipOffset, followMouse, hideArrow } = this.props;
    const style = getTooltipStyles(isError, followMouse, tooltipOffset, place);
    const { isMobile } = this.context;

    return isMobile ? (
      children
    ) : (
      <>
        {React.cloneElement(React.Children.only(children), this.wrapperProps)}
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
