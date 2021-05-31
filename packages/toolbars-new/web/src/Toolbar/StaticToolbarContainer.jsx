/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './ToolbarContainer.scss';

class StaticToolbarContainer extends Component {
  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  render() {
    const { children } = this.props;
    return (
      <div
        tabIndex={0}
        ref={this.setToolbarContainerRef}
        className={classNames(styles.container, styles.staticContainer)}
      >
        {children}
      </div>
    );
  }
}

StaticToolbarContainer.propTypes = {
  children: PropTypes.any,
};

export default StaticToolbarContainer;
