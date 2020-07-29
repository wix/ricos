import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import Twitter from './icons/twitter';

function openTwitter(selectedText) {
  let text = '“' + selectedText + '“—';
  const url = window.location.href;

  const maxTweetLength = 279;
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
  let content = text.substring(0, maxTextLength - 2);
  content = content.slice(0, content.lastIndexOf(' '));
  content += '…“—';
  return content;
}

const TwitterButton = ({ selectedText }) => {
  return (
    <button
      data-hook="twitter-button"
      className={styles.option}
      onClick={() => openTwitter(selectedText)}
    >
      {<Twitter className={styles.tweet} />}
    </button>
  );
};

TwitterButton.propTypes = {
  selectedText: PropTypes.string.isRequired,
};

export default TwitterButton;
