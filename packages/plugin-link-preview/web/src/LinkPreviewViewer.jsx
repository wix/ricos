import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, pluginLinkPreviewSchema } from 'wix-rich-content-common';
import styles from '../statics/styles/link-preview.scss';

class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    const { componentData } = props;
    validate(componentData, pluginLinkPreviewSchema);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkPreviewSchema);
    }
  }

  async componentDidMount() {
    validate(pluginLinkPreviewSchema, this.props.componentData);
  }

  handleIframeLoad = () => {
    this.iframe.style.height = this.iframe.contentWindow.document.body.scrollHeight + 'px';
    this.iframe.style.width = this.iframe.contentWindow.document.body.scrollWidth + 'px';
  };

  getUrlForDisplay = url => {
    let numOfCharsToRemove = 0;
    if (url.substring(0, 7) === 'http://') {
      numOfCharsToRemove = 7;
    } else if (url.substring(0, 8) === 'https://') {
      numOfCharsToRemove = 8;
    }
    return url.substring(numOfCharsToRemove);
  };

  render() {
    const { componentData, theme, isMobile } = this.props;
    const {
      title,
      description,
      thumbnail_url,
      provider_url,
      config: {
        link: { url },
      },
    } = componentData;

    this.styles = this.styles || mergeStyles({ styles, theme });
    const {
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_url,
    } = this.styles;

    const { imageRatio } = this.state;
    if (!imageRatio) {
      try {
        const imageRatio = document.getElementById('linkPreviewSection')?.offsetHeight;
        this.setState({ imageRatio }, () => this.forceUpdate());
      } catch (e) {}
    }

    return (
      <figure className={linkPreview} id="linkPreviewSection" data-hook="linkPreviewViewer">
        <div
          style={{
            width: isMobile ? 110 : imageRatio || 0,
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className={linkPreview_image}
          alt={title}
        />
        <section className={linkPreview_info}>
          <div className={linkPreview_url}>{this.getUrlForDisplay(provider_url || url)}</div>
          <figcaption className={linkPreview_title} id="link-preview-title">
            {title}
          </figcaption>
          {description && <div className={linkPreview_description}>{description}</div>}
        </section>
      </figure>
    );
  }
}

export default LinkPreviewViewer;
