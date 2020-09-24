import React, { PureComponent } from 'react';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import Measure from 'react-measure';
import { PreviewConfig } from '../';
import styles from '../../statics/styles/image-counter.scss';

interface Props {
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
  counter: number;
  theme: RichContentTheme;
  formatLabel: (counter: number) => string;
  imageSelector: (images?: NodeListOf<Element>) => Element[];
  onClick: () => void;
}

class ImageCounter extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    formatLabel: counter => `+ ${counter}`,
    onClick: () => {},
    imageSelector: images => (images && images.length > 0 ? [images[images.length - 1]] : []),
  };

  container: Element;
  wrapper: Element;
  styles: Record<string, string>;

  onClick = (e: React.MouseEvent) => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand?.();
  };

  renderDecoration = (element: Element) => {
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
      const images = this.wrapper.querySelectorAll('[role=link]');
      const imagesToDecorate = this.props.imageSelector(images);
      const decorations: JSX.Element[] = [];
      imagesToDecorate.forEach(image => decorations.push(this.renderDecoration(image)));
      ReactDOM.render(decorations, this.container);
    }
  };

  componentDidMount() {
    this.decorateImages();
  }

  onResize = debounce(this.decorateImages, 200);

  handleWrapper = (el: HTMLDivElement) => (this.wrapper = el);

  handleContainer = (el: HTMLDivElement) => (this.container = el);

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
