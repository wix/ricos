import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorateComponentWithProps from 'decorate-component-with-props';
import { translate } from 'react-i18next';
import { mergeStyles } from 'wix-rich-content-common';
import { SRC_TYPE_HTML, SRC_TYPE_URL } from './constants';

import Overlay from './Overlay';
import styles from './default-html-styles.scss';

const DEFAULTS = {
  srcType: SRC_TYPE_HTML,
  src: null,
  config: {
    width: 740,
    height: 242,
  },
};

class HTMLComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.componentData.src !== nextProps.componentData.src) {
      this.fillIframeContent(nextProps.componentData.src);
    }
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { keyName, isActive } = (props.componentState && props.componentState.activeButton) || {};
    const inEditMode = keyName === 'edit' && isActive;
    return {
      inEditMode,
      t: PropTypes.func,
    };
  };

  fillIframeContent = src => {
    this.iframeRef && this.iframeRef.contentWindow.postMessage(src, '*');
  };

  handleIframeLoad = () => {
    this.fillIframeContent(this.props.componentData.src);
  };

  setIframe = iframeRef => {
    this.iframeRef = iframeRef;
  };

  baseIframeContent = origin => {
    return (
      /* eslint-disable quotes */
      "<html><head><script>window.addEventListener('message', function(event) {if (event.origin.indexOf('" +
      origin +
      "')>=0) {document.body.innerHTML = event.data;}});</script></head><body></body></html>"
      /* eslint-disable quotes */
    );
  };

  render() {
    const { styles } = this;
    const { blockProps, selection, t } = this.props;
    const isEditorFocused = selection && selection.getHasFocus();
    const { isFocused, readOnly } = blockProps || { readOnly: true };
    const data = this.props.componentData;
    const { src, srcType } = data;
    data.config = data.config || {};

    const itemClassName = classNames(this.props.className, styles.html_itemContainer, {
      [styles.html_inChange]: this.state.inEditMode && isFocused && isEditorFocused,
    });

    const width = data.config.width || DEFAULTS.config.width;
    const height = data.config.height || DEFAULTS.config.height;

    const HTMLOverlay = decorateComponentWithProps(Overlay, { isVisible: readOnly, width, height });

    return (
      <div className={classNames(this.props.className, itemClassName)} style={{ width, height, position: 'relative', margin: 'auto' }}>
        {srcType === SRC_TYPE_HTML && src && (
          <div>
            <iframe
              title="remote content" tabIndex={readOnly ? -1 : 0} scrolling="no" ref={this.setIframe} onLoad={this.handleIframeLoad}
              srcDoc={this.baseIframeContent(window.origin)} sandbox="allow-presentation allow-forms allow-scripts" allowTransparency
              frameBorder="0" width={width} height={height} style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
            />
            <HTMLOverlay />
          </div>
        )}

        {data.srcType === SRC_TYPE_URL && src && (
          <div>
            <iframe
              title="remote content" tabIndex={readOnly ? -1 : 0}
              src={src} allowTransparency scrolling="no" frameBorder="0" sandbox="allow-presentation allow-forms allow-same-origin allow-scripts"
              width={width} height={height} style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
            />
            <HTMLOverlay />
          </div>
        )}

        {!src && (
          <div data-hook="htmlComponent" className={classNames(this.props.className, styles.html_invalidGalleryItems)}>
            {t('HtmlComponent_Init_Text')}
          </div>
        )}
      </div>
    );
  }
}

HTMLComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

const translatedHTMLComponent = translate(null)(HTMLComponent);
export { translatedHTMLComponent as Component, DEFAULTS };
