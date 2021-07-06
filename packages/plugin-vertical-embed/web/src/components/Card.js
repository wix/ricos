import React from 'react';
import PropTypes from 'prop-types';
import CardContent from './CardContent';
import { getLangDir } from 'wix-rich-content-common';
import styles from '../../statics/styles/widget.scss';
import classNames from 'classnames';

const Card = props => {
  const { pageUrl, imageSrc, content, locale } = props;
  const direction = getLangDir(locale);
  return (
    <a className={styles.link} href={pageUrl} target="_blank" rel="noreferrer">
      <div
        style={{ direction }}
        className={classNames(styles[direction], styles.container, styles.cardLayout)}
      >
        {imageSrc && (
          <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
        )}
        <CardContent {...content} />
      </div>
    </a>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string,
  content: PropTypes.object,
  locale: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
};

export default Card;
