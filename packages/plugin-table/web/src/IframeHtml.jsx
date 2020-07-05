import React, { Component } from 'react';
import PropTypes from 'prop-types';
import htmlIframeSrc from './htmlIframeSrc';
import styles from '../statics/styles/Iframe.scss';

const isSSR = typeof window === 'undefined';

const HtmlSrcPath = '/html/db9376e69cfa487ea0fa0b912ae51a4f_v1.html';
class IframeHtml extends Component {
  state = { shouldRender: false };
  id = Math.random()
    .toString(36)
    .substr(2, 9);

  componentDidMount() {
    this.setState({ shouldRender: true });
    !isSSR && window.addEventListener('message', this.handleIframeMessage);
  }

  writeToIframe = iframeElement => {
    this.iframe = iframeElement;
    const iframeDocument = iframeElement?.contentWindow?.document;
    if (iframeDocument) {
      iframeDocument.open('text/html', 'replace');
      iframeDocument.write(htmlIframeSrc);
      iframeDocument.close();
    }
  };

  componentWillUnmount() {
    !isSSR && window.removeEventListener('message', this.handleIframeMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.html !== nextProps.html) {
      this.updateIframeContent(nextProps.html);
    }
  }

  updateIframeContent = content => {
    this.shouldIgnoreLoad = true;
    this.iframe?.contentWindow.postMessage(
      { type: 'htmlPlugin:updateContent', id: this.id, content },
      '*'
    );
  };

  handleIframeMessage = ({ data }) => {
    const { type, id, height } = data;
    if (type === 'htmlPlugin:heightResize' && id === this.id) {
      this.props.onHeightChange(height);
    }
  };

  handleIframeLoad = () => {
    !this.shouldIgnoreLoad && this.updateIframeContent(this.props.html);
  };

  setIframe = iframe => {
    this.iframe = iframe;
  };

  render() {
    const { iframeSandboxDomain } = this.props;

    const iframeProps = {
      className: styles.iframe,
      style: { backgroundColor: 'transparent' },
      onLoad: this.handleIframeLoad,
    };
    if (iframeSandboxDomain) {
      const strippedUrl = iframeSandboxDomain.replace(/\/$/, '');
      iframeProps.src = strippedUrl + HtmlSrcPath;
      iframeProps.ref = this.setIframe;
    } else {
      iframeProps.ref = this.writeToIframe;
    }

    return this.state.shouldRender ? <iframe title={'remote content'} {...iframeProps} /> : null;
  }
}

IframeHtml.propTypes = {
  html: PropTypes.string.isRequired,
  onHeightChange: PropTypes.any,
  iframeSandboxDomain: PropTypes.string,
};

export default IframeHtml;
