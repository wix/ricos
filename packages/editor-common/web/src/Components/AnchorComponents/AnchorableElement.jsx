/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, getImageSrc, isValidUrl } from 'wix-rich-content-common';
import styles from '../../../statics/styles/new-link-panel.scss';
import { ANCHORABLE_BLOCKS } from './consts';
import classNames from 'classnames';
import { get } from 'lodash';

class AnchorableElement extends PureComponent {
  constructor(props) {
    super(props);
    const { block, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = { iconThumbnail: this.getIconThumbnail(block) };
  }

  componentDidMount() {
    const { block } = this.props;
    if (ANCHORABLE_BLOCKS[block.anchorType].visualThumbnail) {
      this.getVisualThumbnail();
    }
  }

  getIconThumbnail = block => {
    if (ANCHORABLE_BLOCKS[block.anchorType].thumbnail) {
      return ANCHORABLE_BLOCKS[block.anchorType].thumbnail;
    } else {
      return ANCHORABLE_BLOCKS[block.anchorType][`thumbnail-${block.type}`];
    }
  };

  getDataToDisplayByField = field => {
    const { block } = this.props;
    if (field === 'thumbnail' && ANCHORABLE_BLOCKS[block.anchorType].visualThumbnail) {
      return this.getVisualThumbnail();
    } else {
      return ANCHORABLE_BLOCKS[block.anchorType][field];
    }
  };

  getContent = () => {
    const { block, t } = this.props;
    if (block.type === 'atomic') {
      if (ANCHORABLE_BLOCKS[block.anchorType].visualThumbnail) {
        return `${t(ANCHORABLE_BLOCKS[block.anchorType].type)} ${block.index}`;
      } else {
        return get(block, ANCHORABLE_BLOCKS[block.anchorType].textPath);
      }
    } else {
      return block.text;
    }
  };

  getAbsoluteUrl = url => (url.substring(0, 4) === 'http' ? url : 'http://' + url);

  getVisualThumbnail = () => {
    const { block } = this.props;
    let src = {};
    switch (block.anchorType) {
      case 'wix-draft-plugin-image':
        src = block.data.src;
        break;
      case 'wix-draft-plugin-video':
        if (block?.data?.src?.thumbnail?.pathname) {
          src.file_name = block?.data?.src?.thumbnail?.pathname;
        } else if (isValidUrl(block?.data?.src)) {
          const noEmbedBasePath = 'https://noembed.com/embed?url=';
          try {
            fetch(`${noEmbedBasePath}${this.getAbsoluteUrl(block.data.src)}`, {
              method: 'GET',
            })
              .then(res => {
                return res.json();
              })
              .then(data => {
                const imgSrc = data.thumbnail_url;
                this.setState({
                  visualThumbnail: imgSrc,
                });
              });
          } catch (e) {
            return new Promise(resolve => {
              setTimeout(() => resolve({}), 1);
            });
          }
        }
        break;
      case 'wix-draft-plugin-gallery':
        src.file_name = block.data.items[0].url;
        break;
      case 'wix-draft-plugin-giphy':
        this.setState({
          visualThumbnail: block.data.gif.downsizedUrl,
        });
        return;
      default:
        // eslint-disable-next-line no-console
        console.error('Mismatch plugins');
        break;
    }
    if (src.file_name) {
      const imgSrc = getImageSrc(src, null, {
        requiredWidth: 50,
        requiredHeight: 50,
        requiredQuality: 90,
        imageType: 'highRes',
      });
      this.setState({
        visualThumbnail: imgSrc,
      });
    }
  };

  visualThumbnailLoaded = e => {
    e.target.style.display = 'block';
    this.setState({ iconThumbnail: null });
  };

  render() {
    const { styles } = this;
    const { iconThumbnail, visualThumbnail } = this.state;
    const { dataHook, onClick, isSelected, t, onEnter } = this.props;
    return (
      <div
        data-hook={dataHook}
        className={classNames(styles.AnchorableElement_container, {
          [styles.AnchorableElement_selected]: isSelected,
        })}
        onClick={
          isSelected
            ? () => onEnter && onEnter()
            : () => onClick({ defaultName: this.getContent() })
        }
        // onClick={() => onClick({ defaultName: this.getContent() })}
        // onDoubleClick={() => onEnter && onEnter()}
      >
        <div className={styles.AnchorableElement_thumbnail}>
          {iconThumbnail && iconThumbnail}
          {visualThumbnail && (
            <img
              src={visualThumbnail}
              alt={this.getContent()}
              style={{ width: 'inherit', height: 'inherit', objectFit: 'cover', display: 'none' }}
              onLoad={e => this.visualThumbnailLoaded(e)}
            />
          )}
        </div>
        <div className={styles.AnchorableElement_contentContainer}>
          <div className={styles.AnchorableElement_contentType}>
            {t(this.getDataToDisplayByField('type'))}
          </div>
          <div className={styles.AnchorableElement_blockContent}>{this.getContent()}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    dataHook: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    block: PropTypes.object,
    theme: PropTypes.object,
    isSelected: PropTypes.bool,
    onEnter: PropTypes.func,
  };
}

export default AnchorableElement;
