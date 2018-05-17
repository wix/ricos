import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import omit from 'lodash/omit';
import Iframe from './Iframe';

class IframeHtml extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.html !== nextProps.html) {
      this.updateIframeContent(nextProps.html);
    }
  }

  updateIframeContent = src => {
    this.iframe && this.iframe.contentWindow.postMessage(src, '*');
  };

  handleIframeLoad = () => {
    this.updateIframeContent(this.props.html);
  };

  setIframe = iframe => {
    this.iframe = iframe;
  };

  getIframeContent = () => {
    return `
      <html>
        <head>
          <script>
            window.addEventListener(
              'message', 
              function(event) {
                if (event.origin.indexOf('${window.origin}') >= 0) {
                  document.body.innerHTML = event.data;
                }
              }
            );
          </script>
        </head>
        <body></body>
      </html>
    `;
  };

  render() {
    return (
      <Iframe
        {...omit(this.props, 'html')}
        iframeRef={this.setIframe}
        onLoad={this.handleIframeLoad}
        srcDoc={this.getIframeContent()}
        sandbox="allow-presentation allow-forms allow-scripts"
      />
    );
  }
}

IframeHtml.propTypes = {
  html: PropTypes.string.isRequired,
};

export default IframeHtml;
