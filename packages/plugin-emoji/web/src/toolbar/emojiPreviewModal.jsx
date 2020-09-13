import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { mergeStyles } from 'wix-rich-content-common';
import addEmoji from '../modifiers/addEmoji';
import JoyPixelsIcon from '../icons/JoyPixelsIcon';
import { getGroupEmojis } from '../utils';
import { getEmojiGroups } from '../constants';
import styles from '../../statics/styles/emoji-preview-modal.scss';

export default class EmojiPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    this.scrollbarRef = '';
    const groups = getEmojiGroups(t);
    this.groupRefs = {};
    groups.map(({ category }) => (this.groupRefs[category] = React.createRef()));
    this.emojiGroupsCategories = groups.map(({ category }) => category);
    this.state = {
      activeGroup: groups[0],
    };
  }

  onNavIconClicked = group => {
    this.setState({ activeGroup: group });
    this.groupRefs[group.category].current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  renderNavIcons = activeGroup => {
    const { t } = this.props;
    return getEmojiGroups(t).map((group, index) => {
      const color = activeGroup.category === group.category ? '#42A5F5' : '#bdbdbd';
      return (
        <div
          key={`emoji-group-${index}`}
          role="button"
          data-hook={'emoji-group-' + index}
          onKeyPress={null}
          tabIndex={0}
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
    const { helpers, setEditorState, getEditorState } = this.props;
    const newEditorState = addEmoji(getEditorState(), emoji);
    setEditorState(newEditorState);
    helpers.closeModal();
  };

  onScroll = event => {
    const { scrollTop } = event.srcElement;
    const { t } = this.props;
    const categoryScrollTop = getEmojiGroups(t).find(({ top }) => scrollTop < top);
    this.setState({ activeGroup: categoryScrollTop });
  };

  renderEmojis = () =>
    this.emojiGroupsCategories.map(category => {
      const emojis = getGroupEmojis(category) || [];
      const emojisElements = emojis.map((emoji, index) => (
        <div
          role="button"
          data-hook={'emoji-' + index}
          onKeyPress={null}
          tabIndex={0}
          className={this.styles.emojiPreviewModal_emoji}
          key={`emojis-${category}-${index}`}
          onClick={this.onEmojiClicked.bind(this, emoji)}
        >
          {emoji}
        </div>
      ));
      return (
        <div
          ref={this.groupRefs[category]}
          key={`anchor-${category}`}
          className={this.styles.emojiPreviewModal_emoji_group}
        >
          {emojisElements}
        </div>
      );
    });

  render() {
    const { activeGroup } = this.state;
    return (
      <div>
        <div className={this.styles.emojiPreviewModal_headerTitle}>
          <div>{activeGroup.title}</div>
          <div className={this.styles.emojiPreviewModal_JoyPixelsIcon}>
            <JoyPixelsIcon />
          </div>
        </div>
        <div className={this.styles.emojiPreviewModal_emojis_groups_container}>
          <Scrollbars
            ref={ref => {
              this.scrollbarRef = ref;
            }}
            renderThumbVertical={() => (
              <div className={this.styles.emojiPreviewModal_scrollbar_thumb} />
            )}
            onScroll={this.onScroll}
          >
            {this.renderEmojis()}
          </Scrollbars>
        </div>
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
