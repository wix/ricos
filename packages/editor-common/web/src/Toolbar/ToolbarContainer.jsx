import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ToolbarContainer.scss';

class ToolbarContainer extends Component {
  setWrapperRef = ref => (this.wrapperRef = ref);

  render() {
    const { isVisible, toolbarPosition, children } = this.props;
    return (
      <div
        ref={this.setWrapperRef}
        className={styles.container}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
          ...toolbarPosition,
        }}
      >
        {children}
      </div>
    );
  }
}

ToolbarContainer.propTypes = {
  isVisible: PropTypes.bool,
  toolbarPosition: PropTypes.object,
  children: PropTypes.any,
};

export default ToolbarContainer;
