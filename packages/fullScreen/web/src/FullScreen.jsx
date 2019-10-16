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
  //todo fix both icons to correct assets
  return (
    <carouselComponents.HeaderFullscreen {...props}>
      {isEnterFullscreen ? <ExpandIcon width="100%" /> : <DecreaseIcon />}
    </carouselComponents.HeaderFullscreen>
  );
}
HeaderFullscreen.displayName = 'HeaderFullscreen';

export default class Fullscreen extends React.Component {
  modalStyles = {
    blanket: base => ({ ...base, zIndex: 10 }),
    positioner: base => ({ ...base, zIndex: 11 }),
    dialog: base => ({ ...base, zIndex: 12 }),
  };
  styles = {
    view: base => ({
      ...base,
      margin: '0 100',
      '>img': {
        maxHeight: 'calc(100vh - 200px)',
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
    navigationNext: base => ({
      ...base,
      background: 'transparent !important',
      opacity: 0.7,
      '&:hover': { opacity: 1 },
    }),
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
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
