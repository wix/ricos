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
    const { componentData, theme, isMobile, settings } = this.props;
    const { imageHeight } = this.state;

    const {
      title,
      description,
      thumbnail_url,
      html,
      provider_url,
      config: {
        link: { url },
      },
    } = componentData;

    const {
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_url,
    } = this.styles;

    if (settings.enableEmbed && html) {
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
      };

      return <HtmlComponent {...htmlCompProps} />;
    } else {
      return (
        <figure className={linkPreview} data-hook="linkPreviewViewer">
          <div
            style={{
              width: imageHeight,
              height: imageHeight,
              backgroundImage: `url(${thumbnail_url})`,
            }}
            className={linkPreview_image}
            alt={title}
            ref={ref => (this.image = ref)}
          />
          <section className={linkPreview_info}>
            <div className={linkPreview_url}>{this.getUrlForDisplay(provider_url || url)}</div>
            <figcaption className={linkPreview_title}>{title}</figcaption>
            {description && <div className={linkPreview_description}>{description}</div>}
          </section>
        </figure>
      );
    }
  }
}

export default LinkPreviewViewer;
