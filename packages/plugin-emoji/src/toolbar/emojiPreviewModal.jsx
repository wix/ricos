/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { getGroupEmojis } from '../utils';
import { getEmojiGroups } from '../constants';
import styles from '../../statics/styles/emoji-preview-modal.scss';

export default class EmojiPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    const getGroup = getEmojiGroups(t)[0];
    this.state = {
      activeGroup: getGroup || {},
      emojis: getGroupEmojis(getGroup.category) || [],
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

  onEmojiClicked = emoji => {
    const { componentData, pubsub, onConfirm } = this.props;

    if (onConfirm) {
      onConfirm({ ...componentData, emoji });
    } else {
      pubsub.update('componentData', { emoji });
    }
  };

  render() {
    const { activeGroup, emojis } = this.state;
    const renderEmojis = emojis.map((emoji, index) => {
      return (
        <span
          className={this.styles.emojiPreviewModal_emoji}
          key={index}
          onClick={this.onEmojiClicked.bind(this, emoji)}
        >
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
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onCloseRequested: PropTypes.func,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  getEditorState: PropTypes.func,
};
