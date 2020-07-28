import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

export default class ViewerInlineToolBar extends React.Component {
  render() {
    const { position = {}, container, children } = this.props;
    const { x, y } = position;
    const { left } = container.getBoundingClientRect();
    const toolbarWidth = 44;
    const padding = 44;
    return (
      <div
        className={styles.container}
        style={{
          top: y - padding,
          left: x - left - toolbarWidth / 2,
        }}
      >
        {children}
      </div>
    );
  }
}

ViewerInlineToolBar.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.any,
  container: PropTypes.object.isRequired,
};
