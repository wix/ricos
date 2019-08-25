/* eslint-disable no-prototype-builtins */
/* eslint-disable fp/no-loops */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { getEmojiGroups } from '../constants';
import styles from '../../statics/styles/emoji-preview-modal.scss';
import { getGroupEmojis } from '../utils';

export default class EmojiPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    this.state = {
      activeGroup: getEmojiGroups(t)[0] || {},
      emojis: getGroupEmojis(getEmojiGroups(t)[0].category) || [],
    };
  }

  onNavIconClicked = group => {
    this.setState({ activeGroup: group });
    this.setState({ emojis: getGroupEmojis(group.category) });
  };

  renderNavIcons = () => {
    const { t } = this.props;

    return getEmojiGroups(t).map((group, index) => (
      <div
        key={index}
        className={this.styles.emoji_icon}
        onClick={this.onNavIconClicked.bind(this, group)}
      >
        {group.icon}
      </div>
    ));
  };

  render() {
    const { activeGroup, emojis } = this.state;
    const renderEmojis = emojis.map((emoji, index) => {
      return (
        <span className={this.styles.emojiPreviewModal_emoji} key={index}>
          {emoji}
        </span>
      );
    });
    return (
      <div>
        <h3>{activeGroup.title}</h3>
        <div className={this.styles.emojiPreviewModal_emoji_icons_container}>
          {this.renderNavIcons()}
        </div>
        <div className={this.styles.emojiPreviewModal_emojis_container}>{renderEmojis}</div>
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
// const {
//   componentData,
//   pubsub,
//   onConfirm,
//   helpers: { closeModal },
// } = this.props;
// const emojiObj = {
//   url: '//cdn.jsdelivr.net/emojione/assets/svg/1f5fb.svg?v=2.2.7',
// };
// if (onConfirm) {
//   onConfirm({ ...componentData, emoji: emojiObj });
// } else {
//   pubsub.update('componentData', { emoji: emojiObj });
// }

// closeModal();
