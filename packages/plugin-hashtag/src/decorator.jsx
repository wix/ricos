import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import hashtagRegexes from './hashtagRegexes';
import styles from '../statics/hashtag.scss';

const findHashtagEntities = (contentBlock, callback) => {
  const text = contentBlock.getText();
  const type = contentBlock.getType();
  if (type === 'code-block' || !text || !text.match(hashtagRegexes.hashSigns)) {
    return [];
  }

  const tags = [];
  text.replace(hashtagRegexes.validHashtag, (match, before, hash, hashText, offset, chunk) => {
    const after = chunk.slice(offset + match.length);
    if (after.match(hashtagRegexes.endHashtagMatch)) {
      return;
    }
    const startPosition = offset + before.length;
    const endPosition = startPosition + hashText.length + 1;
    tags.push({ hashtag: hashText, indices: [startPosition, endPosition] });
  });

  tags.forEach(hashtag => callback(hashtag.indices[0], hashtag.indices[1]));
};

const Hashtag = ({
  children,
  decoratedText,
  createHref,
  onClick,
  target = '_self',
  theme = {},
}) => {
  const text = decoratedText.slice(1);
  const href = createHref ? createHref(text) : null;
  const Component = href ? 'a' : 'span';
  const className = classNames(styles.hashtag, theme && theme.hashtag, {
    [styles.hashtag_hover]: !!href,
    [theme.hashtag_hover]: theme && theme.hashtag_hover && !!href,
  });

  const decoratedOnClick = onClick ? event => onClick(event, text) : null;
  const props = href ? { className, href, target, onClick: decoratedOnClick } : { className };
  return <Component {...props}>{children}</Component>;
};

Hashtag.propTypes = {
  children: PropTypes.node,
  decoratedText: PropTypes.string,
  createHref: PropTypes.func,
  onClick: PropTypes.func,
  target: PropTypes.oneOf(['_self', '_blank']),
  theme: PropTypes.object,
};

export { findHashtagEntities as Strategy, Hashtag as Component };
