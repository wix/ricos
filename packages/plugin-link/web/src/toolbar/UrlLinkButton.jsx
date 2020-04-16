import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLinkDataInSelection } from 'wix-rich-content-editor-common';
import styles from '../../statics/link-viewer.scss';
import { normalizeUrl, mergeStyles } from 'wix-rich-content-common';

export default class UrlLinkButton extends Component {
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.styles = mergeStyles({ styles, theme });
  }

  preventDefault = event => event.preventDefault();

  render() {
    const { styles } = this;
    const { getEditorState } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url = '', target, rel } = linkData || {};
    const href = normalizeUrl(url);
    const anchorProps = {
      href,
      target: target || '_self',
      rel: rel || 'noopener',
      className: styles.toolbarUrl,
      onMouseDown: this.preventDefault,
    };
    return (
      <div className={styles.toolbarUrlContainer}>
        <a {...anchorProps}>{href}</a>
      </div>
    );
  }
}

UrlLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
