import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import Twitter from './icons/twitter.svg';

function handleTweetClick(selectedText) {
  let text = '“'.concat(selectedText.replace(/(\r\n|\r|\n){1,}/g, '')).concat('“');
  const url = window.location.href;

  const maxTweetLength = 280;
  if (text.length + url.length > maxTweetLength) {
    const maxTextLength = maxTweetLength - url.length;
    text = handleText(text, maxTextLength);
  }

  const TWEET_ON_TWITTER_URL = `https://twitter.com/intent/tweet?text=${encodeURI(
    text
  )}&url=${encodeURI(url)}`;

  window.open(TWEET_ON_TWITTER_URL);
}

function handleText(text, maxTextLength) {
  let content = text.substring(0, maxTextLength - 1);
  content = content.slice(0, content.lastIndexOf(' '));
  content = content.concat('…“');
  return content;
}

const TwitterButton = ({ selectedText }) => {
  return (
    <button
      key={'Twitter'}
      className={styles.option}
      onClick={() => handleTweetClick(selectedText)}
    >
      {<Twitter />}
    </button>
  );
};

TwitterButton.propTypes = {
  currentOption: PropTypes.object.isRequired,
  selectedText: PropTypes.string.isRequired,
};

export default TwitterButton;
