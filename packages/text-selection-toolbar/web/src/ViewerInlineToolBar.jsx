import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

export default class ViewerInlineToolBar extends React.Component {
  constructor(props) {
    super(props);
    const { targetId } = props;
    this.viewerRect =
      (document.getElementById(targetId) &&
        document.getElementById(targetId).getBoundingClientRect()) ||
      {};
  }

  render() {
    const { position = {}, children } = this.props;
    const { x, y, width } = position;
    const { top, left } = this.viewerRect;
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
  selectedText: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  targetId: PropTypes.string.isRequired,
  children: PropTypes.any,
};
