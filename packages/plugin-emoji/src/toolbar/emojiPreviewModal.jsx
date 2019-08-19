/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { FAICONS } from '../constants';
import styles from '../../statics/styles/emoji-preview-modal.scss';

export default class EmojiPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onEmojiClicked = () => {
    const {
      componentData,
      pubsub,
      onConfirm,
      helpers: { closeModal },
    } = this.props;
    const emojiObj = {
      url: '//cdn.jsdelivr.net/emojione/assets/svg/1f5fb.svg?v=2.2.7',
    };
    if (onConfirm) {
      onConfirm({ ...componentData, emoji: emojiObj });
    } else {
      pubsub.update('componentData', { emoji: emojiObj });
    }

    closeModal();
  };

  renderNavIcons = () =>
    FAICONS.map((icon, index) => (
      <div key={index} className={this.styles.emoji_icon} onClick={this.onNavIconClicked}>
        {icon}
      </div>
    ));

  onNavIconClicked = () => {
    console.log('iconClicked');
  };
  render() {
    return (
      <div>
        <div className={this.styles.emoji_icons_container}>{this.renderNavIcons()}</div>
        <button onClick={this.onEmojiClicked}>modal emoji</button>
      </div>
    );
  }
}

EmojiPreviewModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  settings: PropTypes.object.isRequired,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onCloseRequested: PropTypes.func,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
};
