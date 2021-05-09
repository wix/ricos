/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, getHost } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginLinkPreviewSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link-preview.schema.json';
import styles from '../statics/styles/link-preview.scss';
import HtmlComponent from 'wix-rich-content-plugin-html/libs/HtmlComponent';
import { LINK_PREVIEW_TYPE } from './types';

class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      enableEmbed: PropTypes.bool,
    }),
    theme: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
    iframeSandboxDomain: PropTypes.string,
    helpers: PropTypes.object,
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

  onLinkPreviewClick = () =>
    this.props.helpers.onViewerAction?.(
      LINK_PREVIEW_TYPE,
      'Click',
      this.props.componentData.config.link.url
    );

  render() {
    const { componentData, theme, isMobile, settings, iframeSandboxDomain } = this.props;
    const { enableEmbed = true } = settings;
    const { imageHeight } = this.state;

    const {
      title,
      description,
      thumbnail_url: thumbnailUrl,
      html,
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
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <figure
          className={linkPreview}
          data-hook="linkPreviewViewer"
          onClick={this.onLinkPreviewClick}
        >
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
            <div className={linkPreviewUrl}>{this.getUrlForDisplay(getHost(url) || url)}</div>
            <figcaption className={linkPreviewTitle}>{title}</figcaption>
            {description && <div className={linkPreviewDescription}>{description}</div>}
          </section>
        </figure>
      );
    }
  }
}

export default LinkPreviewViewer;
