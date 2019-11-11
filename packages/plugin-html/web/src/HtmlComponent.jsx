import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  isValidUrl,
  normalizeUrl,
  validate,
  Context,
  ViewportRenderer,
} from 'wix-rich-content-common';

import {
  SRC_TYPE_HTML,
  SRC_TYPE_URL,
  DEFAULT_COMPONENT_DATA,
  INIT_HEIGHT,
  INIT_WIDTH,
} from './constants';
import schema from '../statics/data-schema.json';
import IframeHtml from './IframeHtml';
import IframeUrl from './IframeUrl';
import htmlComponentStyles from '../statics/styles/HtmlComponent.scss';

const getPageURL = (htmlIframeSrc, siteDomain) => {
  const regex = /http.+com/gm;
  const res = regex.exec(siteDomain) || (htmlIframeSrc && regex.exec && regex.exec(htmlIframeSrc));
  if (res) {
    return res[0];
  }
  return res;
};

class HtmlComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteDomain: this.context && this.context.siteDomain,
    };
  }

  componentDidMount() {
    const { componentData, settings } = this.props;
    const { siteDomain } = this.context;
    if (!componentData.config.width) {
      if (settings && settings.width) {
        componentData.config.width = settings.width;
      } else if (this.element) {
        const { width } = this.element.getBoundingClientRect();
        componentData.config.width = width;
      } else {
        componentData.config.width = INIT_WIDTH;
      }
    }

    if (!componentData.config.height) {
      if (settings && settings.height) {
        componentData.config.height = settings.height;
      } else {
        componentData.config.height = INIT_HEIGHT;
      }
    }
    this.setState({ siteDomain });
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, settings } = props;
    let html = componentData && componentData.src;
    if (componentData.srcType === 'html' && state.siteDomain) {
      const { htmlIframeSrc } = settings;
      const pageURL = getPageURL(htmlIframeSrc, state.siteDomain);
      if (pageURL && html && html.includes && html.includes('adsbygoogle')) {
        const updatedAd = `<ins class="adsbygoogle"\n\tdata-page-url="${pageURL}"`;
        html = html.replace(new RegExp('<ins class="adsbygoogle"', 'g'), updatedAd);
      }
    }
    return {
      html,
    };
  }

  setHeight = iframeHeight => {
    if (iframeHeight !== this.state.iframeHeight) {
      this.setState({ iframeHeight });
      const { store, block } = this.props;
      store && store.setBlockHandler('htmlPluginMaxHeight', block.key, iframeHeight);
    }
  };

  render() {
    const { html } = this.state;
    this.styles =
      this.styles || mergeStyles({ styles: htmlComponentStyles, theme: this.context.theme });
    const { props } = this;
    validate(props.componentData, schema);
    const {
      blockProps,
      componentData: { src, srcType, config: { width: currentWidth, height: currentHeight } = {} },
      settings: { htmlIframeSrc, width, height } = {},
    } = props;

    const style = {
      width: this.context.isMobile ? 'auto' : currentWidth || width || INIT_WIDTH,
      height: currentHeight || height || INIT_HEIGHT,
      maxHeight: this.state.iframeHeight,
    };
    const readOnly = blockProps ? blockProps.readOnly : true;

    return (
      <ViewportRenderer containerStyle={style}>
        <div
          className={this.styles.htmlComponent}
          ref={ref => (this.element = ref)}
          data-hook="HtmlComponent"
        >
          {srcType === SRC_TYPE_HTML && src && (
            <IframeHtml
              key={SRC_TYPE_HTML}
              tabIndex={readOnly ? -1 : 0}
              html={html}
              src={htmlIframeSrc}
              onHeightChange={this.setHeight}
            />
          )}

          {srcType === SRC_TYPE_URL && isValidUrl(src) && (
            <IframeUrl key={SRC_TYPE_URL} tabIndex={readOnly ? -1 : 0} src={normalizeUrl(src)} />
          )}

          {!src && !isValidUrl(src) && <div className={this.styles.htmlComponent_placeholder} />}
        </div>
      </ViewportRenderer>
    );
  }
}

HtmlComponent.contextType = Context.type;

HtmlComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  settings: PropTypes.shape({
    htmlIframeSrc: PropTypes.string.isRequired,
    width: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
  }).isRequired,
  store: PropTypes.object,
  block: PropTypes.object,
};

export { HtmlComponent as Component, DEFAULT_COMPONENT_DATA as DEFAULTS };
