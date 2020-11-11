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
          visibility: isVisible ? 'visible' : 'hidden', //Noam why visibility instead of not rendering
          ...toolbarPosition, //noam check about moving the position logic to this file. Possible props, {position: {x,y, relative:[left, right, center]}, boundary:{x:[x1,x2], y:[y1, y2]}}
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
