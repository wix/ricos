import PropTypes from 'prop-types';
import React from 'react';
import { TWITTER } from './toolbarOptions';
import styles from '../statics/styles/viewer-inline-toolbar.scss';

const TWEET_ON_TWITTER_URL = 'https://twitter.com/intent/tweet?text=';

function handleTweetClick(selectedText) {
  window.open(TWEET_ON_TWITTER_URL + encodeURI(selectedText));
}

const toolbarOptionsActions = {
  [TWITTER]: {
    action: selectedText => handleTweetClick(selectedText),
    buttonText: 'Tweet',
  },
};

export default class ViewerInlineToolBar extends React.Component {
  constructor(props) {
    super(props);
    const { targetId } = props;
    this.viewerRect =
      (document.getElementById(targetId) &&
        document.getElementById(targetId).getBoundingClientRect()) ||
      {};
  }
  getOptionButton = (action, option) => {
    return (
      <button key={option} className={styles.option} onClick={action}>
        {option}
      </button>
    );
  };

  getToolbarOptions = () => {
    const { options, selectedText } = this.props;
    const buttons = [];
    options.map(option => {
      const currentOption = toolbarOptionsActions[option];
      const action = () => currentOption.action(selectedText);
      const buttonText = currentOption.buttonText;
      return buttons.push(this.getOptionButton(action, buttonText));
    });
    return buttons;
  };

  render() {
    const { selectionRect = {} } = this.props;
    const { x, y, width, height } = selectionRect;
    const { top, left } = this.viewerRect;
    return (
      <div
        className={styles.container}
        style={{
          top: y - height - top,
          left: x - left + width * 0.5,
        }}
      >
        {this.getToolbarOptions()}
      </div>
    );
  }
}

ViewerInlineToolBar.propTypes = {
  options: PropTypes.array.isRequired,
  selectedText: PropTypes.string.isRequired,
  selectionRect: PropTypes.object.isRequired,
  targetId: PropTypes.string.isRequired,
};
