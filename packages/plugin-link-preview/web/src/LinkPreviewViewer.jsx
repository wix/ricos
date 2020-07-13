/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, pluginLinkPreviewSchema } from 'wix-rich-content-common';
import styles from '../statics/styles/link-preview.scss';
import HtmlComponent from 'wix-rich-content-plugin-html/dist/lib/HtmlComponent';

class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      enableEmbed: PropTypes.bool,
    }),
    theme: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
    iframeSandboxDomain: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { componentData, theme } = props;
    validate(componentData, pluginLinkPreviewSchema);
    this.state = {};
    this.styles = this.styles || mergeStyles({ styles, theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkPreviewSchema);
    }
  }

  componentDidMount() {
    validate(pluginLinkPreviewSchema, this.props.componentData);
    this.setState({ imageHeight: this.image?.offsetHeight });
  }

  getUrlForDisplay = url => url.replace(/^https?:\/\//, '');

  render() {
    const { componentData, theme, isMobile, settings, iframeSandboxDomain } = this.props;
    const { enableEmbed = true } = settings;
    const { imageHeight } = this.state;

    const {
      title,
      description,
      thumbnail_url: thumbnailUrl,
      html,
      provider_url: providerUrl,
      config: {
        link: { url },
      },
    } = componentData;

    const {
      linkPreview,
      linkPreviewUrl,
      linkPreviewInfo,
      linkPreviewTitle,
      linkPreviewImage,
      linkPreviewDescription,
    } = this.styles;

    if (enableEmbed && html) {
      const htmlCompProps = {
        componentData: {
          ...componentData,
          srcType: 'html',
          src: unescape(html),
          config: {},
        },
        settings,
        theme,
        isMobile,
        iframeSandboxDomain,
      };
      return <HtmlComponent {...htmlCompProps} />;
    } else {
      return (
        <figure className={linkPreview} data-hook="linkPreviewViewer">
          <div
            style={{
              width: isMobile ? '110px' : imageHeight,
              height: imageHeight,
              backgroundImage: `url(${thumbnailUrl})`,
            }}
            className={linkPreviewImage}
            alt={title}
            ref={ref => (this.image = ref)}
          />
          <section className={linkPreviewInfo}>
            <div className={linkPreviewUrl}>{this.getUrlForDisplay(providerUrl || url)}</div>
            <figcaption className={linkPreviewTitle}>{title}</figcaption>
            {description && <div className={linkPreviewDescription}>{description}</div>}
          </section>
        </figure>
      );
    }
  }
}

export default LinkPreviewViewer;
