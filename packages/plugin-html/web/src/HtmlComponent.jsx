import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, normalizeUrl, isValidUrl, validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginHtmlSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-html.schema.json';

import { SRC_TYPE_HTML, SRC_TYPE_URL, INIT_HEIGHT, INIT_WIDTH, defaults } from './defaults';
import IframeHtml from './IframeHtml';
import IframeUrl from './IframeUrl';
import htmlComponentStyles from '../statics/styles/HtmlComponent.scss';

const getPageURL = siteDomain => {
  if (!siteDomain) {
    return;
  }

  const regex = /http.+com/gm;
  const res = regex.exec(siteDomain);
  if (res) {
    return res[0];
  }
  return res;
};

class HtmlComponent extends Component {
  state = {
    siteDomain: undefined,
  };

  componentDidMount() {
    const {
      componentData: { config },
      settings = {},
    } = this.props;
    const { width, height, siteDomain } = settings;
    if (!config.width) {
      if (width) {
        config.width = width;
      } else if (this.element) {
        config.width = this.element.getBoundingClientRect().width;
      } else {
        config.width = INIT_WIDTH;
      }
    }

    if (!config.height) {
      config.height = height || INIT_HEIGHT;
    }
    this.setState({ siteDomain });
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData } = props;
    if (componentData.srcType === 'html') {
      let html = componentData && componentData.src;
      const pageURL = getPageURL(state.siteDomain);
      if (pageURL && html && html.includes && html.includes('adsbygoogle')) {
        const updatedAd = `<ins class="adsbygoogle"\n\tdata-page-url="${pageURL}"`;
        html = html.replace(new RegExp('<ins class="adsbygoogle"', 'g'), updatedAd);
      }
      return {
        html,
      };
    }
  }

  setHeight = iframeHeight => {
    if (iframeHeight !== this.state.iframeHeight) {
      this.setState({ iframeHeight });
      this.props.store?.update('componentData', { config: { height: iframeHeight } });
    }
  };

  render() {
    const { html } = this.state;
    const {
      iframeSandboxDomain,
      theme,
      componentData,
      settings: { width, height } = {},
    } = this.props;
    this.styles = this.styles || mergeStyles({ styles: htmlComponentStyles, theme });

    validate(componentData, pluginHtmlSchema);

    const {
      src,
      srcType,
      config: { width: currentWidth, height: currentHeight } = {},
    } = componentData;

    const style = {
      width: this.props.isMobile ? 'auto' : currentWidth || width || INIT_WIDTH,
      height: currentHeight || this.state.iframeHeight || height || INIT_HEIGHT,
      maxHeight: this.state.iframeHeight,
      maxWidth: '100%',
    };

    return (
      <div
        className={this.styles.htmlComponent}
        ref={ref => (this.element = ref)}
        style={style}
        data-hook="HtmlComponent"
      >
        {srcType === SRC_TYPE_HTML && src && (
          <IframeHtml
            iframeSandboxDomain={iframeSandboxDomain}
            key={SRC_TYPE_HTML}
            tabIndex={0}
            html={html}
            onHeightChange={this.setHeight}
          />
        )}

        {srcType === SRC_TYPE_URL && isValidUrl(src) && (
          <IframeUrl key={SRC_TYPE_URL} tabIndex={0} src={normalizeUrl(src)} />
        )}

        {!src && !isValidUrl(src) && <div className={this.styles.htmlComponent_placeholder} />}
      </div>
    );
  }
}

HtmlComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  settings: {
    width: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
  }.isRequired,
  store: PropTypes.object,
  block: PropTypes.object,
  siteDomain: PropTypes.string,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  iframeSandboxDomain: PropTypes.string,
};

export { HtmlComponent as Component, defaults };
