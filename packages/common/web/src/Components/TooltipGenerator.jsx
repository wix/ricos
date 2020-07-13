/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getTooltipStyles } from './TooltipStyles';
import ToolTip from 'react-portal-tooltip';

class TooltipGenerator extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    tooltipOffset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    parent: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'light', 'dark']),
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    effect: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'dark',
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
    effect: 'solid',
    className: '',
  };

  state = {
    tooltipVisible: false,
  };

  onMouseEnter = e => {
    if (!e.target.disabled) {
      setTimeout(() => {
        this.setState({ tooltipVisible: true });
      }, 0);
    }
  };

  onMouseLeave = () => {
    this.setState({ tooltipVisible: false });
  };

  componentWillUnmount() {
    this.setState({ tooltipVisible: false });
  }

  render() {
    const { parent, content, type, place, tooltipOffset, effect, className } = this.props || {};
    const style = getTooltipStyles(type, effect, tooltipOffset, place);
    const wrapperProps = {
      className,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.onMouseLeave,
    };

    return (
      <Fragment>
        <span {...wrapperProps} ref={p => (this.parent = p)} key="parent">
          {parent}
        </span>
        {this.parent ? (
          <ToolTip
            active={this.state.tooltipVisible}
            // active={this.parent.style.visibility !== 'hidden' && this.state.tooltipVisible}
            parent={this.parent}
            position={place}
            arrow="center"
            style={style}
            tooltipTimeout={10}
            key="tooltip"
          >
            {content}
          </ToolTip>
        ) : null}
      </Fragment>
    );
  }
}

export default TooltipGenerator;
