/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { mergeStyles } from 'wix-rich-content-common';
import addEmoji from '../modifiers/addEmoji';
import { getGroupEmojis } from '../utils';
import { getEmojiGroups } from '../constants';
import styles from '../../statics/styles/emoji-preview-modal.scss';

export default class EmojiPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    this.scrollbarRef = '';
    const getGroup = getEmojiGroups(t)[0];
    this.state = {
      activeGroup: getGroup || {},
      emojis: getGroupEmojis(getGroup.category) || [],
    };
  }

  onNavIconClicked = group => {
    this.setState({ activeGroup: group });
    this.setState({ emojis: getGroupEmojis(group.category) });
    this.scrollbarRef.scrollToTop();
  };

  renderNavIcons = activeGroup => {
    const { t } = this.props;
    return getEmojiGroups(t).map((group, index) => {
      const color = activeGroup.title === group.title ? '#42A5F5' : '#bdbdbd';
      return (
        <div
          key={index}
          className={this.styles.emojiPreviewModal_nav_icon}
          onClick={this.onNavIconClicked.bind(this, group)}
          style={{ color }}
        >
          {group.icon}
        </div>
      );
    });
  };

  onEmojiClicked = emoji => {
    const newEditorState = addEmoji(this.props.getEditorState(), emoji);
    this.props.setEditorState(newEditorState);
  };

  render() {
    const { activeGroup, emojis } = this.state;
    const renderEmojis = emojis.map((emoji, index) => {
      return (
        <div
          className={this.styles.emojiPreviewModal_emoji}
          key={index}
          onClick={this.onEmojiClicked.bind(this, emoji)}
        >
          {emoji}
        </div>
      );
    });
    return (
      <div className={this.styles.emojiPreviewModal_container}>
        <div className={this.styles.emojiPreviewModal_headerTitle}>{activeGroup.title}</div>
        <Scrollbars
          ref={ref => {
            this.scrollbarRef = ref;
          }}
          style={{
            height: '300px',
          }}
          renderThumbVertical={() => (
            <div className={this.styles.emojiPreviewModal_scrollbar_thumb} />
          )}
        >
          {renderEmojis}
        </Scrollbars>
        <div className={this.styles.emojiPreviewModal_emoji_icons_container}>
          {this.renderNavIcons(activeGroup)}
        </div>
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
  setEditorState: PropTypes.func,
};
