import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/unsplash-viewer.scss';

class UnsplashViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    const { componentData, t } = this.props;
    return (
      <div className={styles.unsplash_player_container}>
        <div className={styles.unsplash_image_username}>
          {t('UnsplashPlugin_PhotoBy_Label')} <u>{componentData.image.username}</u>{' '}
          {t('UnsplashPlugin_on_Label')}
          <u>{t('UnsplashPlugin_Unsplash_Label')}</u>
        </div>
        <div className={styles.image_container}>
          <img
            className={this.styles.unsplash_player}
            src={componentData.image.originalUrl}
            alt="unsplash"
          />
        </div>
      </div>
    );
  }
}

UnsplashViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  t: PropTypes.func.isRequired,
};

UnsplashViewer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default UnsplashViewer;
