import React, { PureComponent } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Measure from 'react-measure';
import styles from '../../statics/styles/image-counter.scss';

class ImageCounter extends PureComponent {
  static propTypes = {
    formatLabel: PropTypes.func,
    children: PropTypes.node.isRequired,
    counter: PropTypes.number.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    imageSelector: PropTypes.func,
    theme: PropTypes.object.isRequired,
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
      <div className={this.styles.imageCounter_container} style={style}>
        <span className={this.styles.imageCounter_label}>{formatLabel(counter)}</span>
      </div>
    );
  };

  decorateImages = () => {
    if (this.wrapper) {
      const images = this.wrapper.querySelectorAll('[role=img]');
      const imagesToDecorate = this.props.imageSelector(images);
      const decorations = imagesToDecorate.map(img => this.renderDecoration(img));
      ReactDOM.render(decorations, this.container);
    }
  };

  componentDidMount() {
    this.decorateImages();
  }

  onResize = debounce(this.decorateImages, 200);

  handleWrapper = el => (this.wrapper = el);

  handleContainer = el => (this.container = el);

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    /* eslint-disable */
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <div ref={measureRef} className={this.styles.imageCounter_measure}>
            <div ref={this.handleWrapper} onClick={this.onClick}>
              <div ref={this.handleContainer} className={this.styles.imageCounter_overlay} />
              {this.props.children}
            </div>
          </div>
        )}
      </Measure>
    );
    /* eslint-enable */
  }
}

export default ImageCounter;
