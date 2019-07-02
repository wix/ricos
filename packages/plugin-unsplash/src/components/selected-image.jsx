import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles, WixUtils } from 'wix-rich-content-common';
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
    this.isMobile = WixUtils.isMobile();
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

  renderOverlay = (photo, onClick, index, opacity) => {
    return (
      <div
        className={this.styles.image_overlay}
        role="button"
        tabIndex={0}
        onKeyPress={() => null}
        style={{
          height: this.isMobile ? 32 : 26,
          width: this.isMobile ? photo.width - 20 : photo.width - 12,
          paddingTop: this.isMobile ? photo.height - 32 + 'px' : photo.height - 26 + 'px',
          paddingLeft: this.isMobile ? '20px' : '12px',
          backgroundColor: 'rgba(0, 0, 0,' + opacity + ')',
        }}
        onClick={e => onClick(e, { index, photo })}
      >
        {photo.username}
      </div>
    );
  };

  render() {
    const { index, onClick, photo, margin } = this.props;
    const { isMobile } = this;
    return (
      <div
        style={{
          margin: !isMobile ? margin : 0,
          marginBottom: isMobile && '6px',
          height: photo.height,
          width: photo.width,
          ...cont,
        }}
        role="button"
        tabIndex={0}
        className={this.styles.image_container}
        onMouseEnter={this.onMouseEntered}
        onMouseLeave={this.onMouseLeft}
      >
        {isMobile
          ? this.renderOverlay(photo, onClick, index, 0.0)
          : this.state.isHovered && this.renderOverlay(photo, onClick, index, 0.2)}
        <div
          role="button"
          tabIndex={0}
          onKeyPress={() => null}
          onClick={e => onClick(e, { index, photo })}
        >
          <img style={{ ...imgStyle }} alt={'Unsplash'} {...photo} />
        </div>
      </div>
    );
  }
}

SelectedImage.propTypes = {
  theme: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  margin: PropTypes.number.isRequired,
};

export default SelectedImage;
