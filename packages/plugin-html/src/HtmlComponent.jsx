import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';

import { SRC_TYPE_HTML, SRC_TYPE_URL, DEFAULT_COMPONENT_DATA } from './constants';
import IframeHtml from './IframeHtml';
import IframeUrl from './IframeUrl';
import styles from './HtmlComponent.scss';

class HtmlComponent extends React.Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  render() {
    const { styles } = this;
    const {
      blockProps: { readOnly },
      componentData: { src, srcType, config: { width, height } },
    } = this.props;

    return (
      <div className={styles.htmlComponent} style={{ width, height }} data-hook="HtmlComponent">
        {srcType === SRC_TYPE_HTML && src && (
          <IframeHtml tabIndex={readOnly ? -1 : 0} html={src}/>
        )}

        {srcType === SRC_TYPE_URL && src && (
          <IframeUrl tabIndex={readOnly ? -1 : 0} src={src}/>
        )}

        {!src && (
          <div className={styles.htmlComponent_placeholder}/>
        )}
      </div>
    );
  }
}

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
