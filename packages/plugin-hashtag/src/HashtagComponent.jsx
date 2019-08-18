import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../statics/hashtag.scss';

const Hashtag = props => {
  const { children, decoratedText, createHref, onClick, target = '_self', theme = {} } = props;
  const text = decoratedText.slice(1);
  const href = createHref ? createHref(text) : null;
  const Component = href ? 'a' : 'span';
  const className = clsx(styles.hashtag, theme && theme.hashtag, {
    [styles.hashtag_hover]: !!href,
    [theme.hashtag_hover]: theme && theme.hashtag_hover && !!href,
  });

  const decoratedOnClick = onClick ? event => onClick(event, text) : null;
  const cProps = href ? { className, href, target, onClick: decoratedOnClick } : { className };
  return (
    <Component {...cProps}>
      {React.Children.toArray(children).some(child => child.type === 'span') ? (
        children
      ) : (
        <span>{children}</span>
      )}
    </Component>
  );
};

Hashtag.propTypes = {
  children: PropTypes.node,
  decoratedText: PropTypes.string,
  createHref: PropTypes.func,
  onClick: PropTypes.func,
  target: PropTypes.oneOf(['_self', '_blank']),
  theme: PropTypes.object,
};

export default Hashtag;
