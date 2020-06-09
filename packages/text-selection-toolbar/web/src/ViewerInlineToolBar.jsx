import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

export default class ViewerInlineToolBar extends React.Component {
  render() {
    const { position = {}, viewerRect, children } = this.props;
    const { x, y, width } = position;
    const { top, left } = viewerRect;
    console.log(`top: ${top}, left: ${left}`);
    const toolbarHeight = 44;
    const toolbarWidth = 53;
    const padding = 10;
    return (
      <div
        className={styles.container}
        style={{
          top: y - top - toolbarHeight - padding,
          left: x - left + width * 0.5 - toolbarWidth / 2,
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
