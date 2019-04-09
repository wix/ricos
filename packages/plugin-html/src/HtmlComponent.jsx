import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, isValidUrl, normalizeUrl, validate, Context } from 'wix-rich-content-common';

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

class HtmlComponent extends Component {
  componentDidMount() {
    if (!this.props.componentData.config.width) {
      if (this.props.settings && this.props.settings.width) {
        this.props.componentData.config.width = this.props.settings.width;
      } else if (this.element) {
        const { width } = this.element.getBoundingClientRect();
        this.props.componentData.config.width = width;
      } else {
        this.props.componentData.config.width = INIT_WIDTH;
      }
    }

    if (!this.props.componentData.config.height) {
      if (this.props.settings && this.props.settings.height) {
        this.props.componentData.config.height = this.props.settings.height;
      } else {
        this.props.componentData.config.height = INIT_HEIGHT;
      }
    }
  }

  render() {
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
    };
    const readOnly = blockProps ? blockProps.readOnly : true;

    return (
      <div
        className={this.styles.htmlComponent}
        ref={ref => (this.element = ref)}
        style={style}
        data-hook="HtmlComponent"
      >
        {srcType === SRC_TYPE_HTML && src && (
          <IframeHtml
            key={SRC_TYPE_HTML}
            tabIndex={readOnly ? -1 : 0}
            html={src}
            src={htmlIframeSrc}
          />
        )}

        {srcType === SRC_TYPE_URL && isValidUrl(src) && (
          <IframeUrl key={SRC_TYPE_URL} tabIndex={readOnly ? -1 : 0} src={normalizeUrl(src)} />
        )}

        {!src && !isValidUrl(src) && <div className={this.styles.htmlComponent_placeholder} />}
      </div>
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
};

export { HtmlComponent as Component, DEFAULT_COMPONENT_DATA as DEFAULTS };
