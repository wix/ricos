import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaSmile, FaPaw, FaPlane, FaBell, FaHeart, FaFlag, FaBeer } from 'react-icons/fa';
import { mergeStyles } from 'wix-rich-content-common';
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

  render() {
    return (
      <div>
        <div className={this.styles.emoji_icons_container}>
          <div className={this.styles.emoji_icon}>
            <FaSmile />
          </div>
          <div>
            <FaBeer />
          </div>
          <div>
            <FaFlag />
          </div>
          <div>
            <FaPaw />
          </div>

          <div>
            <FaPlane />
          </div>
          <div>
            <FaBell />
          </div>
          <div>
            <FaHeart />
          </div>
        </div>
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
