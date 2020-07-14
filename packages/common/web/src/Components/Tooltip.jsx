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
    effect: PropTypes.string,
  };

  static defaultProps = {
    type: 'dark',
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
    effect: 'solid',
  };

  state = {
    tooltipVisible: false,
  };

  static contextType = isMobileContext;

  onMouseEnter = e => {
    this.showTooltip(e);
  };

  onMouseLeave = () => {
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

  render() {
    const { children, content, type, place, tooltipOffset, effect } = this.props || {};
    const style = getTooltipStyles(type, effect, tooltipOffset, place);
    const isMobile = this.context;
    const { id } = children?.props;
    const wrapperProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.onMouseLeave,
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
            arrow="center"
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
