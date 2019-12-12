import PropTypes from 'prop-types';
import React from 'react';
import Carousel, { Modal, ModalGateway, carouselComponents } from 'react-images';
import RightArrowIcon from './icons/rightArrow.svg';
import LeftArrowIcon from './icons/leftArrow.svg';
import CloseIcon from './icons/close.svg';
import ExpandIcon from './icons/expand.svg';
import DecreaseIcon from './icons/decrease.svg';

function addChildTo(Comp, Child) {
  Comp.displayName = Comp.name;
  return props => (
    <Comp {...props}>
      {/* eslint-disable-next-line react/prop-types */}
      <Child {...props.innerProps} />
    </Comp>
  );
}

function HeaderFullscreen(props) {
  // eslint-disable-next-line react/prop-types
  const isEnterFullscreen = props.innerProps.title.indexOf('Enter') === 0;
  return (
    <carouselComponents.HeaderFullscreen {...props}>
      {isEnterFullscreen ? <ExpandIcon width="100%" /> : <DecreaseIcon />}
    </carouselComponents.HeaderFullscreen>
  );
}
HeaderFullscreen.displayName = 'HeaderFullscreen';

export default class Fullscreen extends React.Component {
  static defaultProps = {
    topMargin: 0,
    backgroundColor: '#000',
    foregroundColor: '#fff',
  };

  modalStyles = {
    blanket: base => ({
      ...base,
      zIndex: 1000,
      backgroundColor: this.props.backgroundColor,
    }),
    positioner: base => ({
      ...base,
      zIndex: 1001,
      top: this.props.topMargin,
      '& button': { color: this.props.foregroundColor },
    }),
    dialog: base => ({ ...base, zIndex: 1002 }),
  };
  styles = {
    view: base => ({
      ...base,
      maxHeight: `calc(100vh - ${200 + this.props.topMargin}px)`,
      '>img': {
        maxHeight: 'inherit',
      },
    }),
    header: base => ({
      ...base,
      width: '100%',
      '&>span:nth-child(2)': {
        width: '100%',
        display: 'flex ', //The space at the end is important. For some reason it displays it differently.
        justifyContent: 'space-between',
      },
    }),
    navigation: base => ({ ...base, width: '100vw' }),
    navigationNext: base => ({
      ...base,
      background: 'transparent !important',
      opacity: 0.7,
      '&:hover': { opacity: 1 },
    }),
    footerCount: base => {
      const display = this.props.images.length === 1 && 'none';
      return { ...base, color: this.props.foregroundColor, display };
    },
  };

  render() {
    const { onClose, index, images, isOpen } = this.props;
    return (
      <ModalGateway>
        {isOpen ? (
          <Modal onClose={onClose} styles={this.modalStyles}>
            <Carousel
              views={images}
              currentIndex={index}
              components={{
                NavigationPrev: addChildTo(carouselComponents.NavigationNext, LeftArrowIcon),
                NavigationNext: addChildTo(carouselComponents.NavigationNext, RightArrowIcon),
                HeaderClose: addChildTo(carouselComponents.HeaderClose, CloseIcon),
                HeaderFullscreen,
              }}
              styles={this.styles}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}

Fullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  index: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  topMargin: PropTypes.number,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
};
