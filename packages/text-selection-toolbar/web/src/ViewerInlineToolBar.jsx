import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

export default class ViewerInlineToolBar extends React.Component {
  render() {
    const { position = {}, viewerRect, children } = this.props;
    const { x, y } = position;
    const { left } = viewerRect.getBoundingClientRect();
    const toolbarWidth = 53;
    const padding = 43;
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
  viewerRect: PropTypes.object.isRequired,
};
