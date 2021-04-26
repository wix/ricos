import React, { Component } from 'react';
import cls from 'classnames';

import { ImageUpload } from '../../image-upload';

import { withPoll, PollContextPropTypes } from '../../poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from '../../rce-helpers-context';

import { LabeledToggle } from 'wix-rich-content-plugin-commons';
import { mergeStyles } from 'wix-rich-content-common';

import { AddIcon, RemoveIcon } from '../../../assets/icons';

import styles from './edit-poll-section.scss';

class EditPollSectionComponent extends Component {
  styles = mergeStyles({ styles, theme: this.props.rce.theme });

  static propTypes = {
    ...PollContextPropTypes,
    ...RCEHelpersPropTypes,
  };

  updateSettings(layout) {
    this.props.store.update('componentData', {
      layout,
    });
  }

  handleInputChange(cb) {
    return event => {
      cb(event.target.value);
    };
  }

  handleOptionTitleUpdate(index, option) {
    return title =>
      this.props.updatePollOption(index, {
        ...option,
        title,
      });
  }

  handleOptionImageUpdate(index, option) {
    return mediaId =>
      this.props.updatePollOption(index, {
        ...option,
        mediaId,
      });
  }

  handleOptionRemove(index) {
    return () => this.props.removeOption(index);
  }

  render() {
    const { poll, addOption, changePollTitle, changePollImage, layout, t } = this.props;

    return (
      <div>
        <input
          maxLength={160}
          className={cls(this.styles.poll_input, this.styles.poll_input_title)}
          value={poll.title}
          onChange={this.handleInputChange(changePollTitle)}
          placeholder={t('Poll_Editor_Question_Placeholder')}
          type="text"
        />

        {layout.poll?.enableImage && (
          <ImageUpload
            className={this.styles.poll_image}
            value={poll.mediaId}
            onChange={changePollImage}
          />
        )}

        <ul className={this.styles.poll_option_list}>
          {poll.options.map((option, i) => (
            <li className={this.styles.poll_option_list_item} key={option.id || i}>
              {layout.option?.enableImage && (
                <ImageUpload
                  disabled={option.count}
                  className={this.styles.poll_option_image}
                  value={option.mediaId}
                  onChange={this.handleOptionImageUpdate(i, option)}
                  small
                />
              )}
              <input
                disabled={option.count}
                maxLength={60}
                className={cls(this.styles.poll_input, this.poll_input_option)}
                value={option.title}
                onChange={this.handleInputChange(this.handleOptionTitleUpdate(i, option))}
                placeholder={t('Poll_Editor_Answer_Placeholder')}
                type="text"
              />
              {poll.options.length > 1 && (
                <RemoveIcon
                  onClick={this.handleOptionRemove(i)}
                  className={this.styles.poll_icon_remove}
                />
              )}
            </li>
          ))}
        </ul>

        <div className={this.styles.poll_controls}>
          <button
            onClick={addOption}
            className={cls(
              this.styles.poll_header_button,
              this.styles.poll_header_button_primary,
              this.styles.poll_add_option
            )}
          >
            <AddIcon width={12} height={12} />
            &nbsp;
            {t('Poll_Editor_Answer_AddAnswer')}
          </button>

          <LabeledToggle
            label={t('Poll_PollSettings_Tab_Layout_Section_Question_Image')}
            checked={layout.poll?.enableImage}
            onChange={() =>
              this.updateSettings({ poll: { enableImage: !layout.poll?.enableImage } })
            }
            theme={this.props.theme}
          />

          <LabeledToggle
            label={t('Poll_PollSettings_Tab_Layout_Section_Answers_Image')}
            checked={layout.option?.enableImage}
            onChange={() =>
              this.updateSettings({ option: { enableImage: !layout.option?.enableImage } })
            }
            theme={this.props.theme}
          />
        </div>
      </div>
    );
  }
}

export const EditPollSection = withPoll(withRCEHelpers(EditPollSectionComponent));
