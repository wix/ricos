import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icons, directions } from '../defaults';
import styles from '../../statics/styles/expand-collapse-button.rtlignore.scss';

class ExpandCollapseButton extends Component {
  constructor(props) {
    super(props);
    this.Icon = Icons[props.iconStyle];
  }

  getIconContainerStyle = () => {
    const { zIndex, direction } = this.props;
    const scaleX = direction === directions.LTR ? 1 : -1;
    const transform = `scaleX(${scaleX})`;

    return { zIndex, transform };
  };

  getIconStyle = () => {
    const { isExpanded } = this.props;
    return {
      transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
      transition: 'transform 0.15s linear',
    };
  };

  render() {
    const { onClick } = this.props;
    return (
      <button
        className={styles.iconContainer}
        style={this.getIconContainerStyle()}
        onClick={onClick}
      >
        <this.Icon style={this.getIconStyle()} />
      </button>
    );
  }
}

ExpandCollapseButton.propTypes = {
  isExpanded: PropTypes.bool,
  direction: PropTypes.string,
  zIndex: PropTypes.number,
  iconStyle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExpandCollapseButton;
