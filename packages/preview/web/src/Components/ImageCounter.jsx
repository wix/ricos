import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/image-counter.scss';

class ImageCounter extends PureComponent {
  static propTypes = {
    formatLabel: PropTypes.func,
    children: PropTypes.node.isRequired,
    counter: PropTypes.number.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
    imageSelector: PropTypes.func,
  };

  static defaultProps = {
    formatLabel: counter => `+ ${counter}`,
    onClick: () => {},
    imageSelector: images => (images && images.length > 0 ? [images[images.length - 1]] : []),
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  componentDidMount() {
    const { formatLabel, counter } = this.props;
    if (this.el) {
      setTimeout(() => {
        const images = this.el.querySelectorAll('[role=img]');
        const imagesToDecorate = this.props.imageSelector(images);
        imagesToDecorate.forEach(img => {
          const decoration = document.createElement('div');
          decoration.classList.add(styles.imageCounter_container);
          decoration.innerText = formatLabel(counter);
          img.parentNode.insertBefore(decoration, img);
        });
      }, 0);
    }
  }

  element = el => (this.el = el);

  render() {
    return <div ref={this.element}>{this.props.children}</div>;
  }
}

export default ImageCounter;
