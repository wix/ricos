/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/selected-image.scss';
const imgStyle = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s',
};
const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
};

class SelectedImage extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      isHovered: false,
    };
  }

  onMouseEntered = () => {
    this.setState({ isHovered: true });
  };
  onMouseLeft = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { index, onClick, photo, margin } = this.props;
    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className={this.styles.image_container}
        onMouseEnter={this.onMouseEntered}
        onMouseLeave={this.onMouseLeft}
      >
        {this.state.isHovered && (
          <div
            className={this.styles.image_overlay}
            style={{
              height: photo.height,
              width: photo.width - 12,
              paddingTop: photo.height - 26 + 'px',
              paddingLeft: '12px',
            }}
            onClick={e => onClick(e, { index, photo })}
          >
            {photo.username}
          </div>
        )}
        <img style={{ ...imgStyle }} {...photo} />
      </div>
    );
  }
}

export default SelectedImage;
