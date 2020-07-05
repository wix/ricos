import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classnames from 'classnames';
import styles from '../../statics/styles/tooltip.scss';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ReactTooltip: false };
  }
  static propTypes = {
    content: PropTypes.string.isRequired,
    data_id: PropTypes.string,
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'light', 'dark']),
    shouldRebuildOnUpdate: PropTypes.func,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    hideArrow: PropTypes.bool,
    followMouse: PropTypes.bool,
  };

  static defaultProps = {
    moveBy: { x: 0, y: 0 },
    type: 'dark',
    shouldRebuildOnUpdate: () => false,
    place: 'top',
  };

  async componentDidMount() {
    const ReactTooltip = await import('react-tooltip').then(ReactTooltip => ReactTooltip.default);
    this.rebuildTooltips = debounce(ReactTooltip.rebuild, 50);
    this.rebuildTooltips();
    this.setState({ ReactTooltip });
  }

  componentDidUpdate() {
    this.props.shouldRebuildOnUpdate() && this.rebuildTooltips?.();
  }

  componentWillUnmount() {
    this.state.ReactTooltip?.hide?.();
  }

  render() {
    const { children, content, moveBy, type, place, hideArrow, followMouse, data_id } =
      this.props || {};
    const className = classnames(styles.tooltip, {
      [styles.tooltipWithoutArrow]: hideArrow,
    });

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        'data-class': className,
        'data-tip': content,
        'data-offset': JSON.stringify({ top: moveBy.y, left: moveBy.x }),
        'data-type': type,
        'data-place': place,
        'data-effect': followMouse ? 'float' : 'solid',
        'data-for': data_id,
      })
    )[0];
  }
}

export default Tooltip;
