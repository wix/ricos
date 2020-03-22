import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLinkDataInSelection } from 'wix-rich-content-editor-common';
import styles from '../../statics/link-viewer.scss';
import { normalizeUrl, mergeStyles } from 'wix-rich-content-common';

export default class UrlLinkButton extends Component {
  constructor(props) {
    super(props);
    this.state = { styles };
  }

  componentDidMount() {
    const theme = this.props.theme;
    this.setState({ styles: mergeStyles({ styles, theme }) });
  }

  preventDefault = event => event.preventDefault();

  render() {
    const { getEditorState } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url = '', target, rel } = linkData || {};
    const href = normalizeUrl(url);
    const anchorProps = {
      href,
      target: target || '_self',
      rel: rel || 'noopener',
      className: this.state.styles.toolbarUrl,
      onMouseDown: this.preventDefault,
    };
    return (
      <div className={this.state.styles.toolbarUrlContainer}>
        <a {...anchorProps}>{href}</a>
      </div>
    );
  }
}

UrlLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  linkModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
};
