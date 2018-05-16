import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorateComponentWithProps from 'decorate-component-with-props';
import { translate } from 'react-i18next';
import { mergeStyles } from 'wix-rich-content-common';

import Overlay from './Overlay';
import styles from './default-html-styles.scss';

const DEFAULTS = {
  src: null,
  config: {
    width: 200,
    height: 200,
    safe: true,
    isSrc: true,
  },
};

class HTMLComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.componentData.content !== nextProps.componentData.content) {
      this.fillIframeContent(nextProps.componentData);
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

  fillIframeContent = data => {
    if (this.iframeRef) {
      if (data.content && !data.config.isSrc) {
        console.log('fillIframeContent data.content', data.content); //eslint-disable-line no-console
        this.iframeRef.contentWindow.postMessage(data.content, '*');
      }
    }
  };
  handleIframeLoad = () => {
    this.fillIframeContent(this.props.componentData);
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

  onKeyDown(e, handler) {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  }

  render() {
    const { styles } = this;
    const { blockProps, selection, t } = this.props;
    const isEditorFocused = selection && selection.getHasFocus();
    const { isFocused, readOnly } = blockProps || { readOnly: true };
    const data = this.props.componentData;
    data.config = data.config || {};

    const itemClassName = classNames(this.props.className, styles.html_itemContainer, {
      [styles.html_inChange]: this.state.inEditMode && isFocused && isEditorFocused,
    });

    const width = data.config.width || DEFAULTS.config.width;
    const height = data.config.height || DEFAULTS.config.height;

    const HTMLOverlay = decorateComponentWithProps(Overlay, { isVisible: readOnly, width, height });

    if (data.src && data.config.isSrc) {
      return (
        <div
          style={{ width: width + 'px', height: height + 'px', position: 'relative', margin: 'auto' }}
          className={classNames(this.props.className, itemClassName)}
        >
          <iframe
            title="remote content" tabIndex={readOnly ? -1 : 0}
            src={data.src} allowTransparency scrolling="no" frameBorder="0" sandbox="allow-presentation allow-forms allow-same-origin allow-scripts"
            width={width} height={height} style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
          />
          <HTMLOverlay />
        </div>
      );
    } else if (data.content && !data.config.isSrc) {
      //draw content after iframe is loaded
      return (
        <div
          style={{ width: width + 'px', height: height + 'px', position: 'relative', margin: 'auto' }}
          className={classNames(this.props.className, itemClassName)}
        >
          <iframe
            title="remote content" tabIndex={readOnly ? -1 : 0} scrolling="no" ref={this.setIframe} onLoad={this.handleIframeLoad}
            srcDoc={this.baseIframeContent(window.origin)} sandbox="allow-presentation allow-forms allow-scripts" allowTransparency
            frameBorder="0" width={width} height={height} style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
          />
          <HTMLOverlay />
        </div>
      );
    } else {
      const initLabel = t('HtmlComponent_Init_Text');
      /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
      return (
        <div
          data-hook="htmlComponent" onClick={this.props.onClick} onKeyDown={e => this.onKeyDown(e, this.props.onClick)}
          className={classNames(this.props.className, styles.html_invalidGalleryItems)} role="alert"
        >
          {initLabel}
        </div>
      );
      /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
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
