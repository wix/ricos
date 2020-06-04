import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getLinkDataInSelection } from 'wix-rich-content-editor-common';
import styles from '../../statics/link-viewer.scss';
import { normalizeUrl, mergeStyles, isValidUrl } from 'wix-rich-content-common';

export default class UrlLinkButton extends Component {
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.styles = mergeStyles({ styles, theme });
  }

  handleClick = () => {
    const { getEditorState } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { anchor = '' } = linkData || {};
    let element;
    const listOfAlllocks = document.querySelectorAll(`[data-editor]`);
    // eslint-disable-next-line fp/no-loops
    for (let i = 0; i < listOfAlllocks.length; i++) {
      if (listOfAlllocks[i].dataset.offsetKey === `${anchor}-0-0`) {
        element = listOfAlllocks[i];
        break;
      }
    }
    element.scrollIntoView({ behavior: 'smooth' });
  };

  preventDefault = event => event.preventDefault();

  render() {
    const { styles } = this;
    const { getEditorState, t } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url = '', anchor, target, rel } = linkData || {};
    const href = url ? normalizeUrl(url) : undefined;
    const anchorProps = {
      href,
      target: target || '_self',
      rel: rel || 'noopener',
      className: classNames(styles.toolbarUrl, { [styles.toolbarUrlAnchor]: anchor }),
      onMouseDown: this.preventDefault,
      onClick: anchor && this.handleClick,
    };
    return (
      <div className={styles.toolbarUrlContainer}>
        <a {...anchorProps}>{href || t('go to section')}</a>
      </div>
    );
  }
}

UrlLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};
