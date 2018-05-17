import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, isValidUrl, normalizeURL } from 'wix-rich-content-common';

import { SRC_TYPE_HTML, SRC_TYPE_URL, DEFAULT_COMPONENT_DATA } from './constants';
import IframeHtml from './IframeHtml';
import IframeUrl from './IframeUrl';
import htmlComponentStyles from './HtmlComponent.scss';

const HtmlComponent = props => {
  const styles = mergeStyles({ styles: htmlComponentStyles, theme: props.theme });
  const {
    blockProps: { readOnly },
    componentData: { src, srcType, config: { width, height } },
  } = props;

  return (
    <div className={styles.htmlComponent} style={{ width, height }} data-hook="HtmlComponent">
      {srcType === SRC_TYPE_HTML && src && (
        <IframeHtml key={SRC_TYPE_HTML} tabIndex={readOnly ? -1 : 0} html={src}/>
      )}

      {srcType === SRC_TYPE_URL && isValidUrl(src) && (
        <IframeUrl key={SRC_TYPE_URL} tabIndex={readOnly ? -1 : 0} src={normalizeURL(src)}/>
      )}

      {!src && !isValidUrl(src) && (
        <div className={styles.htmlComponent_placeholder}/>
      )}
    </div>
  );
};

HtmlComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export {
  HtmlComponent as Component,
  DEFAULT_COMPONENT_DATA as DEFAULTS
};
