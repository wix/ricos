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
    if (this.el) {
      setTimeout(() => {
        const images = this.el.querySelectorAll('[role=img]');
        const imagesToDecorate = this.props.imageSelector(images);
        imagesToDecorate.forEach(img => img.classList.add(styles.imageCounter_container));
      }, 0);
    }
  }

  element = el => (this.el = el);

  render() {
    const { formatLabel, children, counter } = this.props;
    const label = formatLabel(counter);
    /* eslint-disable */
    return (
      <div ref={this.element}>
        {label}
        {children}
      </div>
    );
  }
}

export default ImageCounter;
