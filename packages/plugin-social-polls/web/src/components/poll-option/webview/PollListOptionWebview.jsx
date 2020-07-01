import React from 'react';
import cls from 'classnames';

import { ImageUpload } from '../../image-upload';
import { TextField } from '../../text-field';

import { PollOptionBase } from '../PollOptionBase';

import styles from './option-webview.scss';

export class PollListOptionWebview extends PollOptionBase {
  static propTypes = PollOptionBase.propTypes;

  render() {
    const { option, dark, t } = this.props;

    return (
      <div
        className={cls(styles.option, styles.list, {
          [styles.with_image]: this.isImageEnabled() && option.mediaId,
          [styles.dark]: dark,
        })}
      >
        <div className={styles.title}>
          <TextField
            maxLength={60}
            className={cls(styles.input)}
            value={option.title}
            placeholder={t('Poll_Editor_Answer_Placeholder')}
            startAdornment={<ImageUpload className={styles.image} value={option.mediaId} small />}
          />
        </div>
      </div>
    );
  }
}
