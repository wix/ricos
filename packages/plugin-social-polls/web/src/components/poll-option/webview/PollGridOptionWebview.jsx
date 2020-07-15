import React from 'react';
import cls from 'classnames';

import { TextField } from '../../text-field';
import { ImageUpload } from '../../image-upload';

import { PollOptionBase } from '../PollOptionBase';

import styles from './option-webview.scss';

export class PollGridOptionWebview extends PollOptionBase {
  static propTypes = PollOptionBase.propTypes;

  render() {
    const { option, dark, t } = this.props;

    return (
      <div
        className={cls(styles.option, styles.grid, {
          [styles.with_image]: this.isImageEnabled(),
          [styles.dark]: dark,
        })}
      >
        {this.isImageEnabled() && <ImageUpload className={styles.image} value={option.mediaId} />}
        <div className={styles.title}>
          <TextField
            maxLength={60}
            className={cls(styles.input)}
            value={option.title}
            placeholder={t('Poll_Editor_Answer_Placeholder')}
          />
        </div>
      </div>
    );
  }
}
