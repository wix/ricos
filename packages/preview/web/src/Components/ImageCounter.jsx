import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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

  renderDecoration = element => {
    const { formatLabel, counter } = this.props;
    const rect = element.getBoundingClientRect();
    const parentRect = this.container.getBoundingClientRect();
    const style = {
      width: rect.width,
      height: rect.height,
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left,
    };
    return (
      <div className={styles.imageCounter_container} style={style}>
        <span className={styles.imageCounter_label}>{formatLabel(counter)}</span>
      </div>
    );
  };

  decorateImages() {
    if (this.wrapper) {
      setTimeout(() => {
        const images = this.wrapper.querySelectorAll('[role=img]');
        const imagesToDecorate = this.props.imageSelector(images);
        const decorations = imagesToDecorate.map(img => this.renderDecoration(img));
        ReactDOM.render(decorations, this.container);
      }, 500);
    }
  }

  // componentDidUpdate() {
  //   this.decorateImages();
  // }

  componentDidMount() {
    this.decorateImages();
  }

  handleWrapper = el => (this.wrapper = el);

  handleContainer = el => (this.container = el);

  render() {
    /* eslint-disable */
    return (
      <div ref={this.handleWrapper} onClick={this.onClick}>
        <div ref={this.handleContainer} className={styles.imageCounter_overlay} />
        {this.props.children}
      </div>
    );
    /* eslint-enable */
  }
}

export default ImageCounter;
