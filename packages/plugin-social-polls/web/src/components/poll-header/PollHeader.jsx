import React, { PureComponent } from 'react';
import cls from 'classnames';

import { TextField } from '../text-field';
import { withPoll, PollContextPropTypes } from '../poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { ImageUpload } from '../image-upload';

import styles from './poll-header.scss';

class PollHeaderComponent extends PureComponent {
  render() {
    const { poll, changePollTitle, changePollImage, layout, t, rce } = this.props;

    return (
      <div
        className={cls(styles.header, {
          [styles.webview]: rce.isWebView,
        })}
      >
        <TextField
          autofocus
          textAutoResize
          maxLength={160}
          className={styles.title}
          value={poll.title}
          onChange={changePollTitle}
          placeholder={t('Poll_Editor_Question_Placeholder')}
        />
        {layout.poll?.enableImage && (
          <ImageUpload
            disabled={rce.isPreview}
            className={styles.image}
            value={poll.mediaId}
            onChange={changePollImage}
          />
        )}
      </div>
    );
  }
}

export const PollHeader = withRCEHelpers(withPoll(PollHeaderComponent));

PollHeaderComponent.propTypes = {
  ...PollContextPropTypes,
  ...RCEHelpersPropTypes,
};
